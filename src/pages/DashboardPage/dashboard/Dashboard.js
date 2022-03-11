import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = ({ handleClose, show }) => {

    return (
        <div>
            <Offcanvas className='ofcanvas' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Admin and Users DashBoard</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Link to="/dashboard/addProduct">
                        <li>Add Product </li>
                    </Link>
                    <Link to="/dashboard/makeAdmin">
                        <li>Make Admin </li>
                    </Link>

                    <Link to="/dashboard/userOrder">
                        <li>My Order </li>
                    </Link>
                    <Link to="/dashboard/review">
                        <li>Review </li>
                    </Link>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Dashboard;