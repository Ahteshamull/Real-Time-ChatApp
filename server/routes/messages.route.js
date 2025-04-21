// routes/authRoute.js
import express from "express";
import { verifyToken } from "../Middlewares/auth.js";
import {
  getUserForSidebar,
  getMessages,
  sendMessage,
} from "../Controllers/message.js";

const router = express.Router();
router.get("/user", verifyToken,getUserForSidebar)
router.get("/:id", verifyToken,getMessages)
router.post("/send-message/:id", verifyToken,sendMessage)

export default router;