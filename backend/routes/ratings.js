const express = require("express");
const { ethers } = require("hardhat");
const router = express.Router();
const contractData = require("../contractAddress.json");

// Connect to the blockchain
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d5e2873571ca4f25a736e6573dd53637"); // Replace with your provider
const contractAddress = contractData.contractAddress;
const abi = require("../artifacts/contracts/PerformanceAppraisal.sol/PerformanceAppraisal.json").abi;
const contract = new ethers.Contract(contractAddress, abi, provider);

// Get all ratings from the blockchain
router.get("/", async (req, res) => {
    try {
        const employeeCount = await contract.employeeCount();
        let ratings = [];

        for (let i = 0; i < employeeCount; i++) {
            const rating = await contract.getEmployeeRating(i);
            ratings.push({ employeeId: i, rating: rating.toString() });
        }

        res.json(ratings);
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ error: "Error fetching ratings" });
    }
});

module.exports = router;
