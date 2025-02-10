import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const NotVerified = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(120);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        } else {
            navigate("/signin");
        }
    }, [seconds, navigate]);

    return (
        <>
            <Navbar />
            <div className="container py-5 mt-5">
                <div className="text-center mt-5">
                    <h3>Verification email sent.</h3>
                    <p>Please verify your account and sign in to access XTrans Cloud.</p>
                    <p className="mt-3">Redirecting to Sign-In in <strong>{seconds}</strong> seconds...</p>
                </div>
            </div>
        </>
    );
};

export default NotVerified;
