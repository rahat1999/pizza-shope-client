import React from 'react';
import { Row, Card, Col, Container, Button, Spinner } from 'react-bootstrap'
import login from '../../../images/froms/register.png'
import { useForm } from "react-hook-form";
import './Login.css'
import { Link } from 'react-router-dom';
import { useHistory, useLocation, } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

const Login = () => {
    const { user, isLoading, errorMsg, googleLogin, loginWithEmailAndPassword } = useAuth()
    // console.log(user.email, 'userf');
    const location = useLocation()
    const history = useHistory()


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, password } = data
        loginWithEmailAndPassword(email, password, location, history)
        reset()
    };

    /* =======google ==========*/
    const handleGoogleLogin = (e) => {
        googleLogin(location, history)
        e.preventDefault()
    }




    return (
        <Container className='mt-5'>
            <div>
                {isLoading && <div className='text-center'>
                    <Spinner className=" p-4" animation="border" variant="primary" />
                </div>
                }
                <Row xs={1} md={2} className="g-0 align-items-center">

                    <Col>
                        <h2 className='login-title'>Login Form</h2>
                        <div>

                            {/*============== login From  dtart from here ============= */}


                            {
                                !isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                                    <label className="from-input">
                                        <input placeholder='Email' type='email' {...register("email")} required />
                                    </label>
                                    <label className="from-input">
                                        <input placeholder='Password' type='password' {...register("password")} required />
                                    </label>

                                    {errors.exampleRequired && <span>This field is required</span>}

                                    {user.email && <p className='text-center bg-primary text-white'>Login successfully</p>}
                                    {errorMsg && <p className='text-center bg-danger text-white'>{errorMsg}</p>}

                                    <label className="from-input">
                                        <Button type="submit" variant='warning text-primary'><strong>Submit</strong></Button>
                                    </label>
                                </form>
                            }
                            <p className='text-center'>Don't have account? <Link to="/singup">Please Register</Link></p>

                        </div>
                        <div className='text-center'>
                            <p className='text-center'>----------or---------</p>
                            <Button onClick={handleGoogleLogin} variant='info text-white w-50'><strong>Google Login</strong></Button>
                        </div>
                    </Col>

                    <Col>
                        <Card.Img variant="top" src={login} />
                    </Col>

                </Row>
            </div>
        </Container>
    );
};

export default Login;