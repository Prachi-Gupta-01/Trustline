import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Garbage",
      "Road Damage",
      "Water Leakage",
      "Water Supply",
      "Electricity",
      "others",
    ],
    required: true,
  },
  imageUrl: {
    type: String,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Complaint = mongoose.model("Complaint", complaintSchema);
