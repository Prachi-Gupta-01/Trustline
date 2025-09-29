import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; 

const Signup=()=> {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    itc: "",
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

    try {
      const res = await axios.post("http://localhost:5000/signup", form);//need to be changes as per api
      toast.success(res.data.message);
      navigate("/login"); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
        <div className="signup-form-box">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required  />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required  />

        <select name="gender" value={form.gender} onChange={handleChange} required >
          <option value="Gender">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
        <input type="text" name="address2" placeholder="Address Line 2 (Optional)" value={form.address2} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required  />
        <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required  />
        <input type="text" name="aadhar no." placeholder="Aadhar Number" value={form.itc} onChange={handleChange} required />

        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
    </div>
  );
}
export default Signup