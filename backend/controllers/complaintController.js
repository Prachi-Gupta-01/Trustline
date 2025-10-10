import { Complaint } from "../models/complaint.js";
import { v2 as cloudinary } from "cloudinary";
//create or submit a complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, priority } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    // console.log("Image URL:", imageUrl);
    const trackingId = "CMP" + Date.now();
    const newComplaint = new Complaint({
      title,
      description,
      category,
      location,
      imageUrl,
      priority,
      submittedBy: userId,
      trackingId,
    });

    await newComplaint.save();
    res.status(201).json({
      msg: "Complaint submitted successfully",
      complaint: {
        _id: newComplaint._id,
        title: newComplaint.title,
        description: newComplaint.description,
        user: newComplaint.submittedBy,
        trackingId: newComplaint.trackingId,
        imageUrl: newComplaint.imageUrl,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
export const updateComplaintStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const allowed = ["Submitted", "In Progress", "Closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }
    complaint.status = status;
    complaint.history.push({
      action: "status changed",
      by: req.user.id,
      byName: req.user.name,
      at: Date.now(),
    });
    await complaint.save();
    res.status(200).json({ msg: "Status updated successfully" });
  } catch (err) {
    console.error;
    return res.status(500).json({ error: err.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { message } = req.body;
    if (!message || message.trim().length === 0)
      return res.status(400).json({ msg: "Comment cannot be empty" });
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }
    const comment = { userId: req.user.id, userName: req.user.name, message };
    complaint.comments.push(comment);
    complaint.history.push({
      action: "comment added",
      by: req.user.id,
      byName: req.user.name,
      at: Date.now(),
    });
    await complaint.save();
    res.status(200).json({ msg: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
export const getAllComplaints = async (req, res) => {
  try {
    const { status, category } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    const complaints = (
      await Complaint.find(filter).populate("submittedBy", "name email")
    ).sort({ createdAt: -1 }); //latetst first
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
export const getMyComplaints = async (req, res) => {
  try {
    const userId = req.user.id;
    const complaint = await Complaint.find({ submittedBy: userId })
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
export const assignStaffToComplaint = async (req, res) => {
  try {
    const id = req.params.id;
    const { staffId, staffName } = req.body;
    if (!staffId || !staffName) {
      return res.status(400).json({ msg: "Staff ID and name are required" });
    }
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }
    complaint.assignedTo = staffId;
    complaint.assignedToName = staffName;
    complaint.history.push({
      action: `Assigned to staff ${staffName}`,
      by: req.user.id,
      byName: req.user.name,
      at: Date.now(),
    });
    await complaint.save();
    res.status(200).json({ msg: "Staff assigned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
//track complaint by tracking id
export const trackComplaint = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const complaint = await Complaint.findOne({ trackingId });
    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
