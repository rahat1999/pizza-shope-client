import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';

import useAuth from './../../../hooks/useAuth';


const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth()
    if (isLoading) {
        return <div className='text-center'>
            <Spinner style={{ margin: "100px 0" }} className=" p-4" animation="border" variant="primary" />
        </div>
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;


