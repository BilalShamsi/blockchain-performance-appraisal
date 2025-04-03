const express = require("express");
const { ethers } = require("hardhat");
const router = express.Router();
const contractData = require("../contractAddress.json");

// Connect to the blockchain
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d5e2873571ca4f25a736e6573dd53637"); // Replace with your provider
const contractAddress = contractData.contractAddress;
const abi = require("../artifacts/contracts/PerformanceAppraisal.sol/PerformanceAppraisal.json").abi;
const contract = new ethers.Contract(contractAddress, abi, provider);

// Get all employees from the blockchain
router.get("/", async (req, res) => {
    try {
        const employeeCount = await contract.employeeCount();
        let employees = [];

        for (let i = 0; i < employeeCount; i++) {
            const employee = await contract.employees(i);
            employees.push({ id: i, name: employee[0], position: employee[1] });
        }

        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Error fetching employees" });
    }
});

module.exports = router;
