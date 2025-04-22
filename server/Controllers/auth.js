import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./../Models/user.model.js";
import { generateToken } from "../lib/Util.js";
import cloudinary from './../lib/cloudinary.js';

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
    res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
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
  const {profilePic} = req.body;
  const userId = req.user._id;
    if(!profilePic){
      return res.status(400).json({ message: "Profile picture is required" });
    }
   const upload =  await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url }, { new: true });

    res.status(200).json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
export const checkAuth = async (req, res) => {
  try {
     res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
