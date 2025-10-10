import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Dashboard.css";

const StaffDashboard = () => {
  // ✅ Directly extract all user info from StoreContext
  const {
    username,
    email,
    role,
    department,
    position,
    phone,
    loading,
    user,
  } = useContext(StoreContext);

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    location: "",
  });

  //  Wait until user data is available
  useEffect(() => {
    if (loading) return; // wait until user info is loaded
    if (role !== "Staff") return; // only fetch for staff

    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter only complaints assigned to this staff
        const assigned = res.data.filter(
          (complaint) => complaint.assignedTo === email
        );

        setComplaints(assigned);
        setFilteredComplaints(assigned);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, [loading, email, role]);

  // ✅ Filter complaints dynamically
  useEffect(() => {
    const result = complaints.filter(
      (c) =>
        c.category.toLowerCase().includes(filters.category.toLowerCase()) &&
        c.priority.toLowerCase().includes(filters.priority.toLowerCase()) &&
        c.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (c.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          c.category.toLowerCase().includes(filters.search.toLowerCase()))
    );
    setFilteredComplaints(result);
  }, [filters, complaints]);

  // ✅ Update complaint status
  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      alert(`Complaint updated to "${newStatus}"`);
      setSelectedComplaint(null);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ✅ Handle loading or missing user
  if (loading) return <p>Loading your dashboard...</p>;
  if (role !== "staff") return <p>Access Denied: Staff Only.</p>;

  return (
    <div className="staff-dashboard">
      {/* ===== STAFF INFO SECTION ===== */}
      <div className="staff-header">
        <h1>Welcome, {username || "Staff"} 👋</h1>
        <p>
          <strong>Email:</strong> {email || "N/A"} <br />
          <strong>Department:</strong> {department || "N/A"} <br />
          <strong>Position:</strong> {position || "N/A"}<br/>
          <strong>Phone No.:</strong> {phone || "N/A"}
        </p>
      </div>

      {/* ===== FILTER SECTION ===== */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search complaints..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Garbage">Garbage</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* ===== ASSIGNED COMPLAINTS TABLE ===== */}
      <div className="complaints-list">
        <h2>Assigned Complaints</h2>
        {filteredComplaints.length === 0 ? (
          <p>No complaints assigned to you yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c._id}>
                  <td>{c._id.slice(0, 6)}</td>
                  <td>{c.category}</td>
                  <td>{c.priority}</td>
                  <td>{c.location}</td>
                  <td>{c.status}</td>
                  <td>
                    <button
                      onClick={() => setSelectedComplaint(c)}
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

      {/* ===== POPUP COMPLAINT DETAILS ===== */}
      {selectedComplaint && (
        <div className="complaint-details">
          <div className="details-box">
            <h3>Complaint Details</h3>
            <p><strong>ID:</strong> {selectedComplaint._id}</p>
            <p><strong>Category:</strong> {selectedComplaint.category}</p>
            <p><strong>Priority:</strong> {selectedComplaint.priority}</p>
            <p><strong>Location:</strong> {selectedComplaint.location}</p>
            <p><strong>Description:</strong> {selectedComplaint.description}</p>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>

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

