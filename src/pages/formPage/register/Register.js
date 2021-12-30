import React from 'react';
import { useForm } from 'react-hook-form'
import { Col, Container, Row, Button, Card, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import regis from '../../../images/froms/login.png'
import useAuth from './../../../hooks/useAuth';

const Register = () => {
    const { user, registerUser, isLoading } = useAuth()
    let history = useHistory()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { name, email, password } = data
        registerUser(name, email, password, history)
        reset()
    };

    return (
        <div>
            <Container className='mt-5'>
                <div>
                    <Row xs={1} md={2} className="g-0 align-items-center">

                        <Col>
                            <h2 className='login-title'>Register Form</h2>
                            <div>
                                {isLoading && <div className='text-center'>
                                    <Spinner style={{ margin: "100px 0" }} className=" p-4" animation="border" variant="primary" />
                                </div>
                                }

                                {/* =============================Register from start from here============== */}

                                {
                                    !isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                                        <label className="from-input">
                                            <input placeholder='Full Name' type='text' {...register("name")} required />
                                        </label>
                                        <label className="from-input">
                                            <input placeholder='Enter Your Email' type='email' {...register("email")} required />
                                        </label>
                                        <label className="from-input">
                                            <input placeholder='Enter Password' type='password' {...register("password")} required />
                                        </label>


                                        {errors.exampleRequired && <span>This field is required</span>}
                                        {user.email && <p className='text-center bg-primary text-white'>Register Successfully</p>}
                                        <label className="from-input">
                                            <Button type="submit" variant='warning text-primary'><strong>Submit</strong></Button>
                                        </label>
                                    </form>
                                }
                                <p className='text-center'>Alradey Register?<Link to='/login'>Please Login</Link></p>
                            </div>
                            <div className='text-center'>
                            </div>
                        </Col>

                        <Col>
                            <Card.Img variant="top" src={regis} />
                        </Col>

                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Register;