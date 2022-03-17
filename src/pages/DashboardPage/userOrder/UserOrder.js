import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import './UserOrder.css'

const UserOrder = () => {
    const { user } = useAuth()
    const [userOrders, setUserOrder] = useState([])
    const [control, setControl] = useState(false)

    useEffect(() => {
        fetch(`https://cryptic-shore-66845.herokuapp.com/userOrder?email=${user.email}`, {

        })
            .then(res => res.json())
            .then(data => setUserOrder(data))
    }, [user.email, control])
    return (
        <Container className='my-5'>
            <h2 className='text-center text-warning'>My Orders</h2>
            <Table responsive striped bordered hover className="text-primary">
                <thead>
                    <tr className='bg-dark text-white '>
                        <th>#</th>
                        <th>Name</th>
                        <th>Products</th>
                        <th>Payment</th>
                        <th className="text-center"> Status</th>
                        <th className="text-center"> Order</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userOrders.map((order, index) =>
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <b>{order.name}</b>
                                    <p>✉{order.email}</p>
                                </td>
                                <td>
                                    <b>{order.productName}
                                    </b>
                                    <br />
                                    <span>Order Date: {order.date}</span>
                                    <p>{order.price}$</p>
                                    {order._id}
                                </td>
                                <td className="text-center">
                                    {
                                        order?.payment ? <strong className='bg-success px-4 py-2 rounded text-white'>PAID</strong>
                                            :
                                            <Link to={`/dashboard/payment/${order._id}`}>
                                                <Button variant='warning'><i className="fa-solid fa-wallet"></i> Please Pay</Button>
                                            </Link>
                                    }
                                </td>
                                <td className="text-center">
                                    <b>{order.status}</b>
                                </td>
                                <td className="text-center">
                                    <Button variant="danger"><i className="fa-solid fa-trash-can m-2"></i></Button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </Container >
    );
};

export default UserOrder;