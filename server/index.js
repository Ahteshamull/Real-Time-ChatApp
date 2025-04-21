import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import dbConnected from "./Db/dbConnected.js";
dotenv.config();

const app = express();
dbConnected();
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use((req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

// Start server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
