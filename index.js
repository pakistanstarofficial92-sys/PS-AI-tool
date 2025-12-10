// PS AI Tool - Step 1 Backend (Express)

// 1) Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// 2) Basic setup
const app = express();
const PORT = process.env.PORT || 3000;

// 3) Middlewares
app.use(helmet());        // Security headers
app.use(cors());          // Allow frontend later
app.use(express.json());  // JSON body parser

// 4) Routes

// Root route - simple message
app.get("/", (req, res) => {
  res.status(200).send("✅ Pakistan Star AI Tool Backend (Step 1) is Running");
});

// Status route - JSON status (jaise pehle tha)
app.get("/status", (req, res) => {
  res.status(200).json({
    status: "ok",
    project: "Pakistan Star AI Tool",
    server: "live",
    version: "step-1-express"
  });
});

// Simple test API (future wallet / payment yahin se start hoga)
app.post("/api/message", (req, res) => {
  const { message } = req.body || {};

  // Abhi sirf echo, baad mein yahin AI, wallet etc. ayega
  res.status(200).json({
    received: message || null,
    reply: "PS AI Tool backend ne tumhara message receive kar liya ✅",
  });
});

// 404 route (agar upar se koi route match na ho)
app.use((req, res) => {
  res.status(404).send("404 - Not Found (PS AI Tool Step 1)");
});

// 5) Start server
app.listen(PORT, () => {
  console.log("PS AI Tool backend running on port " + PORT);
});