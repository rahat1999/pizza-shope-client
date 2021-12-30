import React from 'react';
import useAuth from './../../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const CoustomerReview = () => {
    const { user } = useAuth()

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        data.date = new Date().toLocaleDateString()
        fetch('https://cryptic-shore-66845.herokuapp.com/coustomerReview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Review Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                };
            })
    };

    return (
        <Container className='mx-auto'>
            <h2 className='text-center text-warning'>Review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="from-input">
                    <input readOnly value={user.displayName} {...register("name")} required />
                </label>
                <label className="from-input">
                    <input readOnly value={user?.email} {...register("email")} required />
                </label>
                <label className="from-input">
                    <textarea rows={4} placeholder='Food discription' {...register("discription")} required />
                </label>
                <label className="from-input">
                    Rating
                    <select  {...register("rating")} required>
                        <option value="">-select-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>

                <label className="from-input">
                    <Button variant='warning' className="product-input" type="submit"> Submit</Button>
                </label>


            </form>

        </Container>
    );
};

export default CoustomerReview;