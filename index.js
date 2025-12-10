// ================================
// PS AI Tool - STEP 4 (JWT PROTECTED ROUTE)
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

// ---------------- TEMP DATABASE ----------------
const users = [];

// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.send("✅ PS AI Tool Backend STEP 4 is Running");
});

// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email & password required" });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword
  };

  users.push(user);

  res.json({
    message: "✅ User registered",
    user: { id: user.id, email: user.email }
  });
});

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "✅ Login successful",
    token
  });
});

// ---------------- AUTH MIDDLEWARE ----------------
function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ---------------- PROTECTED ROUTE ----------------
app.get("/me", auth, (req, res) => {
  res.json({
    message: "✅ Protected data",
    user: req.user
  });
});

// ---------------- STATUS ----------------
app.get("/status", (req, res) => {
  res.json({
    step: 4,
    users: users.length,
    status: "ok"
  });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});