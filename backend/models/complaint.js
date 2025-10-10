import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const complaintSchema = new mongoose.Schema(
  {
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
    location: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
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
      enum: ["Submitted", "In Progress", "Closed"],
      default: "Submitted",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedToName: String,
    comments: [commentSchema],
    history: [
      {
        action: String, // e.g., "Status changed to In Progress"
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        byName: String,
        at: { type: Date, default: Date.now },
      },
    ],
    trackingId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
