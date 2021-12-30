import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import './Review.css'
const Review = () => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetch('https://cryptic-shore-66845.herokuapp.com/coustomerReview')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
                setLoading(true)
            })
    }, [])

    return (
        <Container className='my-5 '>
            <h2 className='text-center text-warning'>Reviews</h2>
            <br />
            {loading ? <Row xs={1} md={1} className="g-3 shadow">
                {
                    reviews.map(rev => <Col className='review-container'>
                        <Row xs={1} md={2} className="g-1 align-items-center">
                            <Col>
                                <div className='review-items'>
                                    <h4 className='text-danger' >{rev.name}</h4>
                                    <p>{rev.discription}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className='text-center'>
                                    <div>
                                        <ReactStars
                                            value={rev.rating}
                                            size={34}
                                            activeColor="#ffd700"
                                        /></div>
                                    <p>{rev.date}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    )}

            </Row >
                :
                <div className="text-center"> <Spinner animation="border" /></div>}
        </Container >
    );
};

export default Review;