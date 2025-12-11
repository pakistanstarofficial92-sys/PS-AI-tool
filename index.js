import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./src/routes/auth.js";
import apiRoutes from "./src/routes/api.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ROUTES
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("PS-AI Tool Backend Running");
});

// FIXED PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);