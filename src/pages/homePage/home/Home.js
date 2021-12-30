import React from 'react';
import Footer from '../../sharedPage/footer/Footer';
import Banner from '../banner/Banner';
import Products from '../products/Products';
import Review from './../review/Review';


const Home = () => {
    return (
        <div>
            <Banner />
            <Products />
            <Review />
            <Footer />

        </div>
    );
};

export default Home;