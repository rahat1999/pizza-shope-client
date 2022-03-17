import React from 'react';
import { Container, Col, Card, Row } from 'react-bootstrap';
import chefOne from '../../../images/Staff/chef-portrait-1.png'
import chefTwo from '../../../images/Staff/chef-portrait-2.png'
import chefThree from '../../../images/Staff/chef-portrait-3.png'
import chefFour from '../../../images/Staff/chef-portrait-4.png'

const OurStaff = () => {
    const staffs = [
        {
            id: '01',
            name: "Maria Doe",
            img: chefOne,
            position: 'CHEF DE CUISINE',
            about: 'Pellentesque ornare sem lacinia quam venenatis.'

        },
        {
            id: '02',
            name: "Matt Smith",
            img: chefTwo,
            position: 'EXECUTIVE CHEF',
            about: 'We denounce with righteous indignation and dislike..'

        },
        {
            id: '03',
            name: "Sonia Luke",
            img: chefThree,
            position: 'CHEF DE PARTIE',
            about: 'Matters to this principle of selection pleasures.'

        },
        {
            id: '04',
            name: "Jessica Hingis",
            img: chefFour,
            position: 'CHEF DE CUISINE',
            about: 'Perfectly simple and easy to distinguish in a free'

        },
    ]
    return (
        <div>
            <Container>
                <h2 className='text-center'>Our Staff</h2>
                <p className='text-center'>We specialise in intelligent & effective Search and believes in the power of <br /> partnerships to grow business.</p>
                <Row xs={1} md={4} className="g-4">

                    {
                        staffs.map(staff =>
                            <Col key={staff.id}>
                                <Card className='shadow'>
                                    <Card.Img variant="top" src={staff.img} />
                                    <Card.Body className='text-center'>
                                        <h4 className='text-bold'>{staff.name}</h4>
                                        <p>{staff.position}</p>
                                        <Card.Text>
                                            {staff.about}
                                        </Card.Text>
                                        <ul>
                                            <a href="#" className='text-danger fs-5'><i className="fa-brands fa-facebook-f"></i></a>
                                            <a href="#" className='mx-4 text-danger fs-5'><i className="fa-brands fa-twitter"></i></a>
                                            <a href="#" className='text-danger fs-5'><i className="fa-brands fa-instagram"></i></a>

                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>)
                    }

                </Row>
            </Container>
        </div >
    );
};

export default OurStaff;