
import { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

const AllOrders = () => {
    const [orderList, setOrderList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fetch('https://cryptic-shore-66845.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => {
                setOrderList(data)
                setIsLoading(true)
            })
    }, [])
    return (
        <Container className='my-4' >
            <h2 className='text-center'>All Orders</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name & Email</th>
                        <th>Food & Date</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    isLoading ? <tbody>
                        {
                            orderList?.map((list, indx) =>
                                <tr key={list._id}>
                                    <td>{indx + 1}</td>
                                    <td>{list?.name} <br />{list.email} </td>
                                    <td className='text-center'>{list.productName} <br />{list.date} </td>
                                    <td className='py-1 px-2'>{list.payment}</td>
                                    <td className='bg-info text-white'><b>{list.status}</b></td>
                                    <td className='text-center'><Button variant='danger'> <i className="fa-solid fa-trash-can mx-3"> </i></Button></td>
                                </tr>
                            )
                        }

                    </tbody>
                        :
                        <div className="text-center m-auto text-danger"> <Spinner animation="border" />Loading...</div>
                }
            </Table>
        </Container >
    );
};

export default AllOrders;