import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe('pk_test_51JwniYApcXzxd6l8DztBL3Xzly0E80lLUN6lrpIrqsnRBPSaD82J9yFq7gx84dXmeY8E1Jfafo9dGxs7ntOrpZEJ00AMK8ylTm');


const Payment = () => {
    const { paymentId } = useParams()
    const [myOrder, setMyOrder] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch(`https://cryptic-shore-66845.herokuapp.com/orders/${paymentId}`)
            .then(res => res.json())
            .then(data => {
                setLoading(true)
                setMyOrder(data)
            })
    }, [])
    return (
        <div>
            {
                loading ? <Container>
                    <br />
                    <h2>Please Pay </h2>
                    <br />
                    <Card className='text-center shadow py-5 p-2'>
                        <h5 className='text-center text-primary'> Payment ID : <b>{paymentId}</b></h5>
                        <h3>Dear "{myOrder?.name}" </h3>
                        <Card.Title>
                            Please <strong className='text-warning bg-secondary rounded px-2'>PAY: {myOrder.price} TAKA</strong> for your food <strong className='text-warning bg-secondary px-2 rounded'> {myOrder.productName}</strong>
                        </Card.Title>

                        {
                            myOrder?.price
                            &&
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    myOrder={myOrder}
                                />
                            </Elements>
                        }


                    </Card>
                </Container>
                    :
                    <h4 className='text-center text-success mt-5'>Loading...</h4>
            }

        </div>
    );
};

export default Payment;