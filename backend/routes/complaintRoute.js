import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  addComment,
  updateComplaintStatus,
  assignStaffToComplaint,
} from "../controllers/complaintController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post(
  "/complaints",
  authenticateUser,
  authorizeRoles("citizen"),
  createComplaint
);
//view their own complaints
router.get(
  "/complaints/me",
  authenticateUser,
  authorizeRoles("citizen"),
  getMyComplaints
);
//view all complaints - admin
router.get(
  "/complaints",
  authenticateUser,
  authorizeRoles("staff"),
  getAllComplaints
);
//update
router.put(
  "/complaints/:id/status",
  authenticateUser,
  authorizeRoles("staff"),
  updateComplaintStatus
);
//add comment
router.post(
  "/complaints/:id/comments",
  authenticateUser,
  authorizeRoles("staff", "citizen"),
  addComment
);
//assign staff to complaont
router.put(
  "/complaints/:id/assign",
  authenticateUser,
  authorizeRoles("staff"),
  assignStaffToComplaint
);
export default router;
