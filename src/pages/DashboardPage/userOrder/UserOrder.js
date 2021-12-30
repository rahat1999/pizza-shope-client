import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
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

                                </td>
                                <td className="text-center">
                                    <b>{order.status}</b>
                                </td>
                                <td className="text-center">
                                    delet
                                    {/* <Button
                                        onClick={() => handelOrder(order._id)} variant="danger"><CancelOutlinedIcon /> Cancel</Button> */}
                                </td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default UserOrder;