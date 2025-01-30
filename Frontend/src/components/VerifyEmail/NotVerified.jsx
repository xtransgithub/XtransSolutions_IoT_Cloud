import React from 'react';
import Navbar from '../Navbar/Navbar';

const NotVerified = () => {
    return (
        <>
            <Navbar />
            <div className='container py-5 mt-5'>
                <div className="text-center mt-5">
                    <h3>Verification email sent. </h3> 
                    <p>Please verify your account and sign-in to access Xtrans cloud.</p>
                </div>
            </div>
        </>
    );
};

export default NotVerified;
