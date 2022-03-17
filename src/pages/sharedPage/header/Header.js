import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCommentDots, faBars, faAngleDoubleDown, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import Dashboard from '../../DashboardPage/dashboard/Dashboard';

const Header = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user, logOut } = useAuth()

    return (
        <div className='nav-container' >
            <Container>
                <div className='Navigation'>
                    <div className="nav-title">
                        <h4>Skyline Pizza</h4>
                    </div>
                    <div className="nav-list">
                        <ul >

                            <div className="nav-item">
                                <Link to='/'>
                                    <FontAwesomeIcon className='nav-icon' icon={faHome} />
                                    <li>Home</li>
                                </Link>
                            </div>
                            <div className="nav-item">
                                <Link to='/explore'>
                                    <FontAwesomeIcon className='nav-icon' icon={faAngleDoubleDown} />
                                    <li>Explore</li>
                                </Link>
                            </div>

                            {/* <div className="nav-item">
                                <Link to='/massage'>
                                    <FontAwesomeIcon className='nav-icon' icon={faCommentDots} />
                                    <li>Massage</li>
                                </Link>
                            </div> */}


                            {user.email && <div className="nav-item">
                                <Link to='/dashboard'>
                                    <FontAwesomeIcon onClick={handleShow} className='nav-icon' icon={faBars} />
                                    <li onClick={handleShow}>Dashboard</li>
                                </Link>
                                <Dashboard handleClose={handleClose} show={show} />
                            </div>}

                            {
                                user.email ?
                                    <div className="nav-item">
                                        <FontAwesomeIcon className='nav-icon' icon={faSignOutAlt} />
                                        <li onClick={logOut}>LogOut</li>
                                    </div>
                                    :
                                    <div className="nav-item">
                                        <Link to='/login'>
                                            <FontAwesomeIcon className='nav-icon' icon={faSignInAlt} />
                                            <li>Login</li>
                                        </Link>
                                    </div>
                            }
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;