import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Track.css";

const Track= () => {
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState(null);


  const handleChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return toast.error("Please enter a Tracking ID");

    try {
      
      const res = await axios.get(
        `http://localhost:5000/api/complaints/track/${trackingId}`
      );

      setComplaint(res.data.complaint);
      toast.success("Complaint fetched successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Complaint not found or invalid ID"
      );
      setComplaint(null);
    } 
  };

  return (
    <div className="track-container">
      <ToastContainer position="top-center" autoClose={3000} />

      <h2 className="track-title">Track Your Complaint</h2>

      <form onSubmit={handleSubmit} className="track-form">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={handleChange}
          required
        />
        <button type="submit" >
          Track Complaint
        </button>
      </form>

      {complaint && (
        <div className="complaint-details">
          <h3>Complaint Details</h3>
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p>
            <strong>Status:</strong>{" "}
            {complaint.status === "resolved" ? " Resolved" : " In Process"}
          </p>
          {complaint.imageUrl && (
            <div className="complaint-image">
              <img src={complaint.imageUrl} alt="Complaint" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Track;
