import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; 

const Signup=({setShowLogin})=> {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password:"",
    phone: "",
    gender: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    role:"",
    department:"",
  });

  //states for otp verification 
   const [otpSent, setOtpSent] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (form.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (form.pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }
    if(form.password!==form.confirm_password){
      toast.error("password did not match")
      return;
    }
    

    try {
      
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success(res.data.message || "OTP sent to your email");
      setEmailForOtp(form.email);
      setOtpSent(true); //for otp form
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  //  Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: emailForOtp,
        otp,
      });
      toast.success(res.data.message || "Verified successfully");
      setShowLogin(true);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "OTP verification failed");
    }
  };
    
  

  return (
    <div className="signup-container">
        <div className="signup-form-box">
      <ToastContainer position="top-center" autoClose={3000} />
      {!otpSent?(
        <>
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
          <label className="required-field" htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />

          <label  className="required-field" htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required  />

          <label className="required-field" htmlFor="password">Password</label>
        
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <label className="required-field" htmlFor="confirm_password">Confirm Password</label>
        <input type="confirm_password" name="confirm_password" placeholder="XXXX" value={form.confirm_password} onChange={handleChange} required />
        
        
<label  className="required-field" htmlFor="role">Role</label>
         <select  name="role" value={form.role} onChange={handleChange} required >

          <option value="disabled">--Select role--</option>
          <option value="citizen">citizen</option>
          <option value="staff">staff</option>
         
        </select>

        {/*extra fields for staff*/}
        {form.role==="staff"&&(
          <>
          <label className="required-field" htmlFor="department">Department</label>
          <select name="department" value={form.department} onChange={handleChange}required>
           
          <option value="disabled">--Select Department--</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="road">Road</option>
         
          </select>

          </>
        )}
          <label className="required-field" htmlFor="phone">Phone No.</label>
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required  />

  <label className="required-field" htmlFor="gender">Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} required >
          <option value=" disabled">--Select Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

          <label className="required-field" htmlFor="address1">Address</label>
        <input type="text" name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
        <input type="text" name="address2" placeholder="Address Line 2 (Optional)" value={form.address2} onChange={handleChange} />
          <label className="required-field" htmlFor="city">City</label>
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />

          <label className="required-field" htmlFor="state">State</label>

        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required  />

          <label className="required-field" htmlFor="pincode">pincode</label>
        <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required  />


         



        <button type="submit" className="signup-button">Signup</button>

        <p className="switch">
          Already registered? <Link to="/Login"> Login here</Link>
        </p>
      </form>
      </>
      ):(
         <form onSubmit={handleVerifyOtp} className="otp-form">
            <h2 >Verify OTP</h2>
            <p>Enter the OTP sent to <strong>{emailForOtp}</strong></p>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="signup-button">Verify OTP</button>
          </form>
        )
}

    </div>
    </div>
  );
}
export default Signup