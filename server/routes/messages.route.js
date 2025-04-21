// routes/authRoute.js
import express from "express";
import { verifyToken } from "../Middlewares/auth.js";
import { getUserForSidebar } from "../Controllers/message.js";

const router = express.Router();
router.get("/user", verifyToken,getUserForSidebar)

export default router;