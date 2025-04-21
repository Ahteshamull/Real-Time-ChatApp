// routes/authRoute.js
import express from "express";
import {
  login,
  logout,
  registration,
  updateProfile,
} from "../Controllers/auth.js";
const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", updateProfile);

export default router;
