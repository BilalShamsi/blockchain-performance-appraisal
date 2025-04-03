const express = require("express");
const router = express.Router();

// Dummy ratings data
let ratings = [
    { employeeId: 1, rating: 4.5, reviewer: "Bob" },
    { employeeId: 2, rating: 3.8, reviewer: "Alice" }
];

// Get all ratings
router.get("/", (req, res) => {
    res.json(ratings);
});

module.exports = router;
