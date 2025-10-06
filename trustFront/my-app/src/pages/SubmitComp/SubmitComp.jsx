import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SubmitComp.css";

const SubmitComp = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
   // console.log("Token on submit:", token);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/complaints", {
        ...formData,
        submittedBy: "USER_ID_HERE", // Replace with actual logged-in user
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      toast.success(" Complaint submitted successfully!");
    

      console.log(res.data);
      setFormData({ title: "", description: "", category: "", imageUrl: "" }); // clear form
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint!");
       
     
    }
  };

  return (
    <div className="complaint-form-container">
        <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="form-title">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        
        <div className="form-group">
          <label className="required-field">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="form-group">
          <label className="required-field">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        
        <div className="form-group">
          <label className="required-field">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Garbage">Garbage</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="others">Others</option>
          </select>
        </div>

        
        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Paste image link"
          />
        </div>

        
        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>

    
    </div>
  );
};

export default SubmitComp;
