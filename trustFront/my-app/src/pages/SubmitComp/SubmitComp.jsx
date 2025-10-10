import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./SubmitComp.css";

const SubmitComp = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });
  const [trackingId, setTrackingId] = useState(null);
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("location", formData.location);
      if (image) {
        form.append("image", image);
      }

      const res = await axios.post("http://localhost:5000/api/complaints", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Complaint submitted successfully!");
      console.log(res.data);

      //storing tracking id
     setTrackingId(res.data.complaint.trackingId);

      // Clear form
      setFormData({ title: "", description: "", category: "", location: "" });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint!");
    }
  };
   const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
    toast.info("Tracking ID copied!");
  };

  return (
    <div className="complaint-form-container">
      <ToastContainer position="top-center" autoClose={3000} />
      {!trackingId?(
        <>
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
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label className="required-field">Location</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            rows="2"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image (optional)</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Complaint
        </button>
      </form>
      </>
      ):(
 //Popup for tracking ID 
    
      
        <div className="popup">
          <div className="popup-message">
            <h3>Complaint Submitted!</h3>
            <p>Your Tracking ID:</p>
            <strong>{trackingId}</strong>
            <div className="popup-button">
              <button onClick={handleCopy}>Copy ID</button>
              <button onClick={() => navigate("/")}>Close</button>
            </div>
            <p className="track-message">Use this ID to track your complaint.</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default SubmitComp;
