import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const StaffDashboard = () => {
  const [staff, setStaff] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    location: ""
  });

  // 🔹 Fetch Staff details and complaints
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch logged-in staff details
    axios
      .get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setStaff(res.data.user))
      .catch((err) => console.error("Error fetching staff:", err));

    // Fetch complaints
    axios
      .get("http://localhost:5000/api/complaints", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setComplaints(res.data);
        setFilteredComplaints(res.data);
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  // 🔹 Filter complaints
  useEffect(() => {
    let result = complaints.filter(
      (c) =>
        c.category.toLowerCase().includes(filters.category.toLowerCase()) &&
        c.priority.toLowerCase().includes(filters.priority.toLowerCase()) &&
        c.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (c.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          c.category.toLowerCase().includes(filters.search.toLowerCase()))
    );
    setFilteredComplaints(result);
  }, [filters, complaints]);

  // 🔹 Update Complaint Status
  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      alert(`Complaint status updated to ${newStatus}`);
      setSelectedComplaint(null);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="staff-dashboard">
      {/* Staff Header */}
      <div className="staff-header">
        <h1>Welcome, {staff?.name || "Staff Member"} 👋</h1>
        <p>
          <strong>Department:</strong> {staff?.department || "N/A"} <br />
          <strong>Position:</strong> {staff?.position || "N/A"}
        </p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search complaints..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Garbage">Garbage</option>
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="text"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* Complaints List */}
      <div className="complaints-list">
        <h2>Complaints Assigned</h2>
        {filteredComplaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Location</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id.slice(0, 6)}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.priority}</td>
                  <td>{complaint.location}</td>
                  <td>{complaint.status}</td>
                  <td>
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="view-btn"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="complaint-details">
          <div className="details-box">
            <h3>Complaint Details</h3>
            <p>
              <strong>ID:</strong> {selectedComplaint._id}
            </p>
            <p>
              <strong>Category:</strong> {selectedComplaint.category}
            </p>
            <p>
              <strong>Priority:</strong> {selectedComplaint.priority}
            </p>
            <p>
              <strong>Location:</strong> {selectedComplaint.location}
            </p>
            <p>
              <strong>Description:</strong> {selectedComplaint.description}
            </p>
            <p>
              <strong>Status:</strong> {selectedComplaint.status}
            </p>

            {selectedComplaint.status === "Pending" && (
              <button
                onClick={() =>
                  updateStatus(selectedComplaint._id, "In Progress")
                }
                className="status-btn yellow"
              >
                Take Complaint
              </button>
            )}

            {selectedComplaint.status === "In Progress" && (
              <button
                onClick={() => updateStatus(selectedComplaint._id, "Resolved")}
                className="status-btn green"
              >
                Mark as Resolved
              </button>
            )}

            <button
              onClick={() => setSelectedComplaint(null)}
              className="close-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;

