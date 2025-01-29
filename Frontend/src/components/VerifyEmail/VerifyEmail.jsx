import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid"); // Get UUID from URL
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [isVerified, setIsVerified] = useState(false); // To track verification status

  useEffect(() => {
    if (!uuid) {
      setMessage("Invalid verification link.");
      return;
    }

    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/verify-email?uuid=${uuid}`
        );

        if (response.data.status === "success") {
          setMessage("✅ Email verified successfully!");
          setIsVerified(true); // Set verification status to true
        } else {
          setMessage("❌ Verification failed.");
        }
      } catch (error) {
        setMessage("⚠️ Invalid or expired verification link.");
      }
    };

    verifyUser();
  }, [uuid]);

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-gray-700">{message}</h2>

        {isVerified && (
          <button
            onClick={handleLoginRedirect}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}
