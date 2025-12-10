// PS AI Tool - Step 1 Backend (Express)

// 1) Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// 2) App setup
const app = express();
const PORT = process.env.PORT || 3000;

// 3) Middlewares
app.use(helmet());        // Security headers
app.use(cors());          // Allow requests
app.use(express.json()); // JSON body parser

// 4) Routes

// Root route
app.get("/", (req, res) => {
  res.status(200).send("✅ Pakistan Star AI Tool Backend is Running");
});

// Status route
app.get("/status", (req, res) => {
  res.status(200).json({
    status: "ok",
    project: "Pakistan Star AI Tool",
    server: "live"
  });
});

// 5) Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});