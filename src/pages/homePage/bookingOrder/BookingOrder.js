import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from './../../../hooks/useAuth';
import './BookingOrder.css'
import Swal from 'sweetalert2';

const BookingOrder = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth()
    const { productId } = useParams()

    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch(`https://cryptic-shore-66845.herokuapp.com/orderProduct/${productId}`)
            .then(res => res.json())
            .then(getData => {
                setOrder(getData)
                setLoading(true)
            })
    }, [productId])
    // console.log(order);
    const { foodName, image, price, discription } = order;


    const onSubmit = data => {
        data.date = new Date().toLocaleDateString()
        data.status = 'pending...'
        // data.productName = foodName
        // data.price = price
        console.log(data);
        fetch('https://cryptic-shore-66845.herokuapp.com/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Orderd Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
    };


    return (
        <div className='my-5'>
            <Container className='mt-5'>
                <div>
                    {/* {
                        success && 
                    } */}
                    {
                        loading ? <Row xs={1} md={2} className="g-0 align-items-center">

                            <Col>
                                <div className='back-btn'><Link to='/'><i className="fas fa-backward"></i>Back</Link></div>
                                <Card>
                                    <Card.Img variant="top" style={{ height: "250px", width: "300px", margin: 'auto', borderBottom: "2px solid orange" }} src={`data:image/jpeg;base64,${image}`} />
                                    <Card.Body>
                                        <Card.Title>{foodName}</Card.Title>
                                        <div>
                                            <p className='text-danger'><strong>{price} Tk </strong></p>
                                            <p>{discription}</p>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </Col>

                            <Col>
                                <h2 className='login-title'>Booking Product</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <label className="from-input">
                                        <input readOnly value={user.displayName} {...register("name")} required />
                                    </label>
                                    <label className="from-input">
                                        <input readOnly value={user?.email} {...register("email")} required />
                                    </label>
                                    <label className="from-input">
                                        <input value={foodName} {...register("productName")} />
                                    </label>
                                    <label className="from-input">
                                        <input value={price} {...register("price")} required />
                                    </label>
                                    <label className="from-input">
                                        <input type="number" placeholder="Phone Number" {...register("phone")} required />
                                    </label>
                                    <label className="from-input">
                                        <input placeholder="Delivery address" {...register("address")} required />
                                    </label>

                                    {errors.exampleRequired && <span>This field is required</span>}

                                    <br />
                                    <label className="from-input">
                                        <Button
                                            style={{ width: "40%" }}
                                            type="submit" variant="warning"
                                            color="warning">
                                            Place Order
                                        </Button>
                                    </label>
                                </form>
                            </Col>

                        </Row>
                            : <div className="text-center text-success"> <b>Loading...</b> </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default BookingOrder;