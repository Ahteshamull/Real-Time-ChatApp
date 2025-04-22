import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized No Provided Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized Or Invalid Token" });
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};
