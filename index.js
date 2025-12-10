// ===============================
// PS AI TOOL - STEP 2 BACKEND
// User Register + Login (Basic)
// ===============================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "ps_ai_tool_secret_key"; // abhi simple

// --------------------
// Middlewares
// --------------------
app.use(helmet());
app.use(cors());
app.use(express.json());

// --------------------
// Fake DB (temporary)
// --------------------
const users = [];

// --------------------
// Routes
// --------------------

// ✅ Root
app.get("/", (req, res) => {
  res.send("✅ PS AI Tool Backend (Step 2) is Running");
});

// ✅ Status
app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    step: 2,
    server: "live"
  });
});

// ✅ Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
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
    userId: newUser.id
  });
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
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

// --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});