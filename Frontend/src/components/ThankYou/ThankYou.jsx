import React from "react";
import Navbar from "../Navbar/Navbar";
import "./ThankYou.css";

function ThankYou() {
  return (
    <>
      <Navbar />

      <div className="thankyou-page">
        <div className="thankyou-content">
          <h1>Thank You 😊</h1>
          <p>Your message has been sent successfully.</p>
          <p>Our team will contact you soon.</p>
        </div>
      </div>
    </>
  );
}

export default ThankYou;