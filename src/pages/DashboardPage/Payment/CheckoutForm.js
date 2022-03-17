import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from './../../../hooks/useAuth';

const CheckoutForm = ({ myOrder }) => {

    const { price, name, _id } = myOrder;
    const { user } = useAuth()

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecrect, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://cryptic-shore-66845.herokuapp.com/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        setProcessing(true)

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message)
            setSuccess('')
        } else {
            setError('')
            // console.log(paymentMethod);
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecrect,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: user.email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message)
            setSuccess('')
        }
        else {
            setError('')
            setProcessing(false)
            setSuccess('Payment successfull!')
            Swal.fire(
                'Payment successfull!',
                '',
                'success'
            )
            // console.log(paymentIntent);
            //save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            fetch(`https://cryptic-shore-66845.herokuapp.com/orders/${_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payment }),
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#000',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    processing ? <Spinner animation="border" variant="primary" />
                        : <Button type="submit" disabled={!stripe || success}>
                            Pay ${price}
                        </Button>
                }
                {
                    error && <p className='text-danger mt-2 text-center'>{error}</p>
                }
                {success && <p className='text-success mt-2 text-center'>{success}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;