// routes/authRoute.js
import express from "express";
import {
  login,
  logout,
  registration,
  updateProfile,
  checkAuth,
} from "../Controllers/auth.js";
import { verifyToken } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile",verifyToken, updateProfile);
router.get("/user-check",verifyToken, checkAuth);

export default router;
