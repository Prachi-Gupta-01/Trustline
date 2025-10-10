import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";
//register user
export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      gender,
      address1,
      address2,
      city,
      state,
      pincode,
      // adhaar,
      role,
    } = req.body;
    //validation
    // if anyfield is missing
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    // if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //generate otp(6-dig)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10mins

    //create new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      address1,
      address2,
      city,
      state,
      pincode,
      otp,
      otpExpires,
      isVerified: false,
      role,
    });

    //send otp to email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email-OTP Code",
      text: `Hi ${username}, your OTP is ${otp}. It will expires in 10minutes.`,
    };
    await newUser.save();
    try {
      await transporter.sendMail(mailOptions);

      res.status(201).json({
        msg: "Otp sent to your email.Please verify to complete registration.",
      });
    } catch (emailErr) {
      console.log("Email sending error, user not saved", emailErr);
      res
        .status(500)
        .json({ error: "Failed to send OTP email. Please try again." });
    }
  } catch (err) {
    console.log("signup error", err);
    res.status(400).json({ error: err.message });
  }
};

// verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    if (user.isVerified) {
      return res.status(400).json({ msg: "User already verified" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "OTP has expired" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ msg: "User verified successfully" });
  } catch (err) {
    console.log("error in otp verification", err);
    res.status(500).json({ error: err.message });
  }
};

//resend otp
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // prevent OTP spam
    if (user.otpExpires && user.otpExpires - Date.now() > 9 * 60 * 1000) {
      return res
        .status(429)
        .json({ msg: "Please wait a minute before requesting another OTP." });
    }

    // new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // Send
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email - OTP Code",
      text: `Hi ${user.username}, your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      msg: "New OTP sent to your email. Please verify to complete registration.",
    });
  } catch (err) {
    console.error("Error in resend OTP:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    //generate JWT token'
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("error in auth,", err);
    res.status(500).json({ error: err.message });
  }
};
//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.log("logout error", err);
    res.status(500).json({ error: err.message });
  }
};
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();
    //send otp to email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email-OTP Code",
      text: `Hi , your OTP is ${otp}. It will expires in 10minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);

      res.status(201).json({
        msg: "Otp sent to your email.Please verify to complete registration.",
      });
    } catch (emailErr) {
      console.log("Email sending error, user not saved", emailErr);
      res
        .status(500)
        .json({ error: "Failed to send OTP email. Please try again." });
    }
  } catch (err) {
    console.log("error in request password reset", err);
    res.status(500).json({ error: err.message });
  }
};
//verify otp for password reset
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    if (!user.otp) {
      return res.status(400).json({ msg: "Please request a new OTP" });
    }
    if (user.otp !== otp.toString()) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ msg: "Password reset successful" });
  } catch (err) {
    console.log("error in reset password", err);
    res.status(500).json({ error: err.message });
  }
};
