import React, { useState } from "react";
import "./OtpVerify.css"; 

const OtpVerify = ({ email, onVerify ,onResend,onBack}) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp); 
  };

  
  const handleResend = () => {
    if (onResend) {
      onResend(); 
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack(); 
    }
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
      <div className="otp-actions">
        <button type="button" className="otp-back" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="otp-resend" onClick={handleResend}>
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;
