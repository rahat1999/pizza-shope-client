import React from 'react';
import { Card, } from 'react-bootstrap';
import Bg from '../../../images/pizza-banner.jpg'
import './Banner.css'
const Banner = () => {
    return (
        <Card className="bg-dark text-white">
            <Card.Img src={Bg} alt="Card image" />
            <Card.ImgOverlay>
                <div className='banner-text'>
                    <h2>UnLimited <br />
                        Delicious <span className='banner-pizza'>Pizza !!</span></h2>
                </div>

            </Card.ImgOverlay>
        </Card>
    );
};

export default Banner;