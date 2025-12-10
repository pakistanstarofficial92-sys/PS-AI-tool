// ================================
// PS AI Tool - STEP 3 (AUTH SYSTEM)
// ================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "PS_AI_TOOL_SECRET_KEY";

// ---------------- MIDDLEWARE ----------------
app.use(helmet());
app.use(cors());
app.use(express.json());

// ---------------- TEMP DATABASE (STEP 3) ----------------
// Abhi simple array (database baad me aayega)
const users = [];

// ---------------- ROOT CHECK ----------------
app.get("/", (req, res) => {
  res.send("✅ PS AI Tool Backend STEP 3 is Running");
});

// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email & password required" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.json({
    message: "✅ User registered successfully",
    user: { id: newUser.id, email: newUser.email }
  });
});

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "✅ Login successful",
    token
  });
});

// ---------------- STATUS ----------------
app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    step: 3,
    users: users.length
  });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});