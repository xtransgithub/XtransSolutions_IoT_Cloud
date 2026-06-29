import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const verificationAttempted = useRef(false); // Track verification status

  const verifyUser = async () => {
    if (!uuid) {
      setMessage("❌ Invalid verification link.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${config.BACKEND_URL}verify?uuid=${uuid}`);
      if (response.data.status === "success") {
        setMessage("✅ Email verified successfully! Redirecting...");
        setVerified(true);
        setLoading(false); // Mark as complete
        verificationAttempted.current = true; // Prevent future API calls
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setMessage("❌ Verification failed.");
        setLoading(false);
      }
    } catch (error) {
      setMessage("❌ An error occurred. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uuid && !verificationAttempted.current && !verified) {
      verificationAttempted.current = true; // Mark that verification is attempted
      verifyUser();
    }
  }, [uuid, verified]); // Runs only when uuid or verified changes

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 text-center shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-dark">{loading ? "Verifying..." : message}</h2>
        {loading && (
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
