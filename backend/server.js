const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

// Import routes
const employeeRoutes = require("./routes/employees");
const ratingRoutes = require("./routes/ratings");

app.use("/api/employees", employeeRoutes);
app.use("/api/ratings", ratingRoutes);

// Store nonces temporarily (in production, use a database)
const nonces = {};

// Send a nonce to the user for authentication
app.post("/api/auth/nonce", (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Ethereum address required" });

    const nonce = Math.floor(Math.random() * 1000000);
    nonces[address] = nonce;
    res.json({ nonce });
});

// Verify signature
app.post("/api/auth/verify", async (req, res) => {
    const { address, signature } = req.body;

    if (!address || !signature) {
        return res.status(400).json({ error: "Address and signature are required" });
    }

    const nonce = nonces[address];
    if (!nonce) {
        return res.status(400).json({ error: "Nonce not found" });
    }

    try {
        const recoveredAddress = ethers.verifyMessage(nonce.toString(), signature);
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            delete nonces[address]; // Remove nonce after successful login
            res.json({ message: "Authentication successful", address });
        } else {
            res.status(401).json({ error: "Invalid signature" });
        }
    } catch (error) {
        console.error("Signature verification error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
