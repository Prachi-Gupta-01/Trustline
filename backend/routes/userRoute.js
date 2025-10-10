import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/profile", authenticateUser, getUserProfile);

export default router;
