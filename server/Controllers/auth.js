import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";


export const registration = async(req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if (password.length < 6) {
        return res
          .status(400)
              .json({ message: "Password must be at least 6 characters long" });
          
        }
        
      
  } catch (error) {
    
  }

};
export const login = async(req, res) => {
    res.send("login Route Working!");
};
export const logout = async(req, res) => {
    res.send("logout Route Working!");
};
