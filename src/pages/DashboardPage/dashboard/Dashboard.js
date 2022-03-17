import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

const Dashboard = ({ handleClose, show }) => {
    const { isAdmin } = useAuth()
    return (
        <div>
            <Offcanvas className='ofcanvas' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Admin and Users DashBoard</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        isAdmin ? <div>
                            <Link to="/dashboard/allOrders">
                                <li>All Order </li>
                            </Link>
                            <Link to="/dashboard/addProduct">
                                <li>Add Product </li>
                            </Link>
                            <Link to="/dashboard/makeAdmin">
                                <li>Make Admin </li>
                            </Link>
                        </div>
                            :
                            <div>
                                <Link to="/dashboard/userOrder">
                                    <li>My Order </li>
                                </Link>
                                <Link to="/dashboard/review">
                                    <li>Review </li>
                                </Link>
                            </div>

                    }


                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Dashboard;