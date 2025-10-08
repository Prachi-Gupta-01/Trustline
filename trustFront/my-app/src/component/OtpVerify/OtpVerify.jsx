import React, { useState } from "react";
import "./OtpVerify.css"; 

const OtpVerify = ({ email, onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp); 
  };

  return (
    <div className="otp-form">
      <h2>Enter OTP</h2>
      <p>Enter the OTP sent to <strong>{email}</strong></p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit" className="otp-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerify;
