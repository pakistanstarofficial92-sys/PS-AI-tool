const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PS AI Tool Backend Running");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email aur password chahiye"
    });
  }

  res.json({
    message: "Register OK",
    email
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});