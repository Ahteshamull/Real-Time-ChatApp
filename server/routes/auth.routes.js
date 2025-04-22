// routes/authRoute.js
import express from "express";
import { protectRoute } from './../Middlewares/auth.js';
import {
  login,
  logout,
  registration,
  updateProfile,
  checkAuth,
} from "../Controllers/auth.js";


const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
