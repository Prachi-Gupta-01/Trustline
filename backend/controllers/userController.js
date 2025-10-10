import { User } from "../models/user.js";
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -confirmPassword -otp -otpExpiry"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log("error in getting user profile,", err);
    res.status(500).json({ error: err.message });
  }
};
