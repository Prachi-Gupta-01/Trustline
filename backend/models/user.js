import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    adhaar: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["citizen", "staff"],
      default: "citizen",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
