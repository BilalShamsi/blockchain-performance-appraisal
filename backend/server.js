const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

// Import routes
const employeeRoutes = require("./routes/employees");
const ratingRoutes = require("./routes/ratings");

// Use routes
app.use("/api/employees", employeeRoutes);
app.use("/api/ratings", ratingRoutes);

app.get("/", (req, res) => {
    res.send("✅ Backend is running on port 5001");
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
        res.json({ user: { username: "admin", role: "admin" } });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
