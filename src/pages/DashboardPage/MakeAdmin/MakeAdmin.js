import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
const MakeAdmin = () => {
    const [email, setEmail] = useState('');

    const handleOnBlur = e => {
        setEmail(e.target.value);

    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://cryptic-shore-66845.herokuapp.com/users/admin', {
            method: "put",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    setEmail('')
                    Swal.fire('Make Admin successfully')
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: "Something went wrong! May Be This email Already Admin or Didn't registred yet",
                    })
                }
            })
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