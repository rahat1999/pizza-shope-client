import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './footer.css'

const Footer = () => {
    return (
        <div className='mt-5 footer-container'>
            <Container>
                <Row xs={1} md={2} className="g-4 text-center">
                    <Col>
                        <div className='footer'>
                            <h4>Pizza hut</h4>
                            <a target='_blank' href="www.instagram.com"><i className="fab fa-instagram-square"></i></a>
                            <br />
                            <a target='_blank' href="www.facbook.com"><i className="fab fa-facebook-square"></i></a>
                            <br />
                            <a target='_blank' href="www.youtube.com"><i className="fab fa-youtube-square"></i></a>
                        </div>
                    </Col>
                    <Col>
                        <div className='footer-info'>
                            <h4>Contact us!</h4>
                            <p>Address: Dhanmodi 24/12</p>
                            <p>Contact: +9384923343</p>
                            <p>Email: pizzahut@gmail.com</p>

                        </div>
                    </Col>
                </Row>
                <p className='end-text'>Pizza Hut 2021@</p>
            </Container>
        </div >
    );
};

export default Footer;