import express from "express";
import {
  register,
  verifyOtp,
  login,
  resendOtp,
} from "../controllers/authController.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

//register route
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
//login route
router.post("/login", login);
router.get("/citizen", authorizeRoles("citizen"), (req, res) => {
  res.status(200).json({ msg: "Citizen route" });
});
router.get("/staff", authorizeRoles("staff"), (req, res) => {
  res.status(200).json({ msg: "Staff route" });
});
export default router;
