import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification); // create
router.get("/:userId", getNotifications); // fetch all for user
router.put("/:id/read", markAsRead); // mark as read

export default router;
