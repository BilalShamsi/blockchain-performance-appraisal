const express = require("express");
const router = express.Router();

// Dummy employees data
let employees = [
    { id: 1, name: "Alice", position: "Developer" },
    { id: 2, name: "Bob", position: "Manager" }
];

// Get all employees
router.get("/", (req, res) => {
    res.json(employees);
});

module.exports = router;
