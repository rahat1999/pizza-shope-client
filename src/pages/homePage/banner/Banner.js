import React from 'react';
import { Card, } from 'react-bootstrap';
import Bg from '../../../images/pizza-banner.jpg'
import './Banner.css'
const Banner = () => {
    return (
        <Card className="bg-dark text-white">
            <Card.Img className='banner-image' src={Bg} alt="Card image" />
            <Card.ImgOverlay>
                <div className='banner-text'>
                    <h1>UnLimited <br />
                        Delicious <span className='banner-pizza'>Pizza !!</span></h1>
                </div>

            </Card.ImgOverlay>
        </Card>
    );
};

export default Banner;