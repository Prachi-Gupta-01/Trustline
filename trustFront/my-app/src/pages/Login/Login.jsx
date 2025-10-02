import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; 

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
   
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if ( !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      toast.success(res.data.message);
      navigate("/"); //change as per routes
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

  toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <ToastContainer position="top-center" autoClose={3000} />
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">email</label>
           <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
            <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">Login</button>

           <p className="switch">
           Don't have an account? <Link to="/Signup"> Register here</Link>
          </p>
          </form>
      </div>
    </div>
  );
};

export default Login;
