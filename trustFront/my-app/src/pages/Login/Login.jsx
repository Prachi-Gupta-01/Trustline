import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import OtpVerify from "../../component/OtpVerify/OtpVerify";

const Login = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect after login
      setShowLogin(true);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  // Send OTP for forgot password
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email: form.email });
      toast.success("OTP sent to your email");
      setEmailForOtp(form.email);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <ToastContainer position="top-center" autoClose={3000} />

        {!forgotPassword ? (
          // === Login Form ===
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Login</h2>
            <label className="required-field">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label className="required-field">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <button type="submit" className="login-button">Login</button>

            <p className="switch">
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setForgotPassword(true)}>
                Forgot Password?
              </span>
            </p>

            <p className="switch">
              Don't have an account? <Link to="/Signup">Register here</Link>
            </p>
          </form>
        ) : !otpSent ? (
          // === Enter Email to Send OTP ===
          <form onSubmit={handleSendOtp} className="login-form">
            <h2 className="login-title">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">Send OTP</button>
            <p>
              <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setForgotPassword(false)}>
                Back to Login
              </span>
            </p>
          </form>
        ) : !otpVerified ? (
          // === OTP Verification Step ===
          <OtpVerify
            email={emailForOtp}
            onVerify={async (enteredOtp) => {
              try {
                await axios.post("http://localhost:5000/api/auth/verify-otp", {
                  email: emailForOtp,
                  otp: enteredOtp,
                });
                toast.success("OTP verified!");
                setOtpVerified(true); 
                setVerifiedOtp(enteredOtp);
              } catch (err) {
                toast.error(err.response?.data?.error || "OTP verification failed");
              }
            }}
            onResend={async () => {
              try {
                await axios.post("http://localhost:5000/api/auth/forgot-password", { email: emailForOtp });
                toast.success("OTP resent successfully");
              } catch (err) {
                toast.error(err.response?.data?.error || "Failed to resend OTP");
              }
            }}
            onBack={() => setOtpSent(false)}
          />
        ) : (
          //enter new password
          <div className="otp-new-password-form">
            <h2 className="login-title">Reset Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <button
              className="login-button"
              onClick={async () => {
                if (!newPassword || !confirmNewPassword) {
                  toast.error("Enter new password");
                  return;
                }
                if (newPassword !== confirmNewPassword) {
                  toast.error("Passwords do not match");
                  return;
                }
                try {
                  await axios.post("http://localhost:5000/api/auth/reset-password", {
                    email: emailForOtp,
                    otp:verifiedOtp,
                    newPassword,
                  });
                  toast.success("Password reset successfully!");
                  // reset states
                  setForgotPassword(false);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setNewPassword("");
                  
                  setConfirmNewPassword("");
                } catch (err) {
                  toast.error(err.response?.data?.error || "Password reset failed");
                }
              }}
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
