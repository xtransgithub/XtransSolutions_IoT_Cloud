import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../config";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!uuid) {
        setMessage("❌ Invalid verification link.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${server}verify?uuid=${uuid}`);

      if (response.data.status === "success") {
        setMessage("✅ Email verified successfully! Redirecting...");
        setLoading(false);
        setTimeout(() => navigate("/signin"), 5000); // Auto redirect in 5 seconds
      } else {
        setMessage("❌ Verification failed.");
        setLoading(false);
      }
    };

    verifyUser();
  }, [uuid, navigate]);

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
