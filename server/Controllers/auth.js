import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./../Models/user.model.js";
import { generateToken } from "../lib/Util.js";

export const registration = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
      }
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          newUser,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal server error",
      });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "You Have Don't Any Account" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
          message: error.message || "Internal server error",
        
      });
  }
};
export const logout = async (req, res) => {
  try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });  
  } catch (error) {
    return res.status(500).json({ message: error.message ||"Internal server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.fullName = fullName;
    await user.save();
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
