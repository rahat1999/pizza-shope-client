import React from 'react';
import { Card, } from 'react-bootstrap';
import notFound from '../../../images/froms/404.svg'
import './NotFound.css'
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div>
            <Card>
                <Card.Img src={notFound} alt="Card image" />
                <Link to='/'>
                    <li className='notfound-butto'>Back Home</li>
                </Link>
            </Card>
        </div>
    );
};

export default NotFound;