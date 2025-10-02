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
    adhaar: "",
    role:"",
  });

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
    
console.log(form)
    try {
      
      const res = await axios.post("http://localhost:5000/api/auth/register", form);//need to be changes as per api
      toast.success(res.data.message);
     // setShowLogin(true);
      navigate("/"); 
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
  alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
        <div className="signup-form-box">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required  />

         <select  name="role" value={form.role} onChange={handleChange} required >

          <option value="disabled">Select role</option>
          <option value="citizen">citizen</option>
          <option value="staff">staff</option>
         
        </select>
          <label htmlFor="password">Password</label>
        
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          <label htmlFor="confirm_password">Confirm Password</label>
        <input type="confirm_password" name="confirm_password" placeholder="XXXX" value={form.confirm_password} onChange={handleChange} required />
        
          <label htmlFor="phone">Phone No.</label>
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required  />

        <select name="gender" value={form.gender} onChange={handleChange} required >
          <option value=" disabled">gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

          <label htmlFor="address1">Address</label>
        <input type="text" name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
        <input type="text" name="address2" placeholder="Address Line 2 (Optional)" value={form.address2} onChange={handleChange} />
          <label htmlFor="city">City</label>
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <label htmlFor="state">State</label>
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required  />
          <label htmlFor="pincode">pincode</label>
        <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required  />


          <label htmlFor="adhaar">Adhaar no.</label>
        <input type="text" name="adhaar" placeholder="Aadhar Number" value={form.adhaar} onChange={handleChange} required />



        <button type="submit" className="signup-button">Signup</button>

        <p className="switch">
          Already registered? <Link to="/Login"> Login here</Link>
        </p>
      </form>
    </div>
    </div>
  );
}
export default Signup