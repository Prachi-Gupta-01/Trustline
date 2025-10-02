import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      adhaar,
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

    //create new user
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
      adhaar,
      role,
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    //console.log(error);
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email, username });
    if (!user) {
      res.status(400).json({ msg: "User does not exist" });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials" });
    }
    //generate JWT token'
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
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
    res.status(500).json({ error: err.message });
  }
};
