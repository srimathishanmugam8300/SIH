const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = "./users.json";

// Helper: load users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Helper: save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup route
app.post("/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const users = loadUsers();
  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  users.push({ name, email, password, role });
  saveUsers(users);

  res.json({ message: "Registration successful" });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password && u.role === role);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
