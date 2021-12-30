import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Container, Card, Button, Spinner, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Explore = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch("https://cryptic-shore-66845.herokuapp.com/allProducts")
            .then(res => res.json())
            .then(data => {
                setFoods(data);
                setLoading(true)
            })

    }, [])
    return (
        <Container className='my-4'>
            <h2 className='text-warning text-center'>Products</h2>
            <br />
            {
                loading ? <div>
                    <Row xs={1} md={4} className="g-3">
                        {
                            foods.slice(0, 6).map(food => <Col key={food._id} >
                                <Card style={{ height: "350px", boxShadow: "1px 1px 4px 1px gray" }}>
                                    <Card.Img variant="top" style={{ height: "200px" }} src={`data:image/jpeg;base64,${food.image}`} />
                                    <Card.Body>
                                        <Card.Title>{food?.foodName}</Card.Title>
                                        <div>
                                            <p>{food.price} Tk </p>
                                            <Link to={`/addTocard/${food?._id}`}>
                                                <Button variant='warning'>Add To Card</Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>)
                        }
                    </Row>
                </div>
                    : <div className="text-center"> <Spinner animation="border" /></div>
            }
        </Container >
    );
};

export default Explore;