import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import messagesRoute from "./routes/messages.route.js";
import dbConnected from "./Db/dbConnected.js";
import cors from "cors";
import { app,server } from "./lib/socket.js";
dotenv.config();


dbConnected();
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messagesRoute);
app.use((req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

// Start server
const port = process.env.SERVER_PORT || 3000;
server.listen(port, () => console.log(`Server listening on port ${port}`));
