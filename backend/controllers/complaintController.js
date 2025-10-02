import { Complaint } from "../models/complaint.js";

//create or submit a complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, imageUrl } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    const newComplaint = new Complaint({
      title,
      description,
      category,
      location,
      imageUrl,
      submittedBy: userId,
    });

    await newComplaint.save();
    res.status(201).json({ msg: "Complaint submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
