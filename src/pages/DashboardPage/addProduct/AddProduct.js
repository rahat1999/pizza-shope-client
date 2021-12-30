import React from 'react';
import { Row, Col, Card, Button, Container, } from 'react-bootstrap';
import addFood from '../../../images/froms/Image post-bro (3).png'
import { useForm } from "react-hook-form";
import './AddProduct.css'
import Swal from 'sweetalert2';

const AddProduct = () => {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const { discription, catagory, price, foodName } = data;
        const image = data.img[0];
        if (!image) {
            alert("Please add an image")
            return;
        }

        const formData = new FormData()
        formData.append('discription', discription)
        formData.append('catagory', catagory)
        formData.append('price', price)
        formData.append('foodName', foodName)
        formData.append('image', image)

        fetch('https://cryptic-shore-66845.herokuapp.com/addProducts', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Product Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                }
            })
            .catch(error => {

                console.error('Error:', error);
            });
    };

    return (
        <div className="product-container">
            <Container>
                <Row xs={1} md={2} className="g-0 align-items-center bg-info shadow-lg">
                    <Col>
                        <h2 className='product-title'>Add Product</h2>
                        <div className='text-center'>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <label className="product-from"> <strong>Food Images:</strong></label>
                                <input className="product-image" accept='image/*' type="file" {...register("img")} />

                                <label className="product-from"> <strong>Food Name:</strong></label>
                                <input className="product-input" type="text" placeholder='Food Name' {...register("foodName")} required />

                                <label className="product-from"><strong>Food Price:</strong> </label>
                                <input className="product-input" type="number" placeholder='Food Price' {...register("price")} required />

                                <label className="product-from"> <strong>Fodd Discription:</strong> </label>
                                <textarea rows={4} placeholder='Food discription' {...register("discription")} required />

                                <label className="product-from"><strong>Catagory:</strong></label>
                                <select  {...register("catagory")} required>
                                    <option value="">-select-</option>
                                    <option value="pizza">pizza</option>
                                    <option value="burger">burger</option>
                                    <option value="drinks">drinks</option>
                                </select>

                                <label className="product-from">
                                    <Button variant='warning' className="product-input" type="submit"> Submit</Button>
                                </label>


                            </form>
                        </div>
                    </Col>
                    <Col>
                        <Card.Img variant="top" src={addFood} />
                        {/* <img src={addFood} alt="" /> */}
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default AddProduct;