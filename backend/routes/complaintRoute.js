import express from "express";
import { createComplaint } from "../controllers/complaintController.js";
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
export default router;
