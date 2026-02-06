require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Body parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// DB
connectDB();

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "API is alive" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);

// ✅ THIS IS THE KEY LINE
module.exports = serverless(app);
