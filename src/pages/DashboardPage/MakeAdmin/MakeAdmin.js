import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const handleOnBlur = e => {
        setEmail(e.target.value);

    }
    const handleAdminSubmit = e => {
        e.preventDefault()
    }
    return (
        <div className='text-center my-5'>
            <h2>Make an Admin</h2>
            <br />
            <form onSubmit={handleAdminSubmit}>
                <labele>
                    <i className="fa-solid fa-envelope"></i> Email : <input className='w-25 shadow' type="email" onBlur={handleOnBlur} />
                </labele>

                <br />
                <br />
                <Button variant='warning' className='my-2' type='submit'>MakeAdmin</Button>
            </form>
        </div>
    );
};

export default MakeAdmin;