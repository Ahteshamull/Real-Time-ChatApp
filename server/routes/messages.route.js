// routes/authRoute.js
import express from "express";
import { protectRoute } from "../Middlewares/auth.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "./../Controllers/message.js";


const router = express.Router();
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send-message/:id", protectRoute, sendMessage);

export default router;