const express = require("express");
const router = express.Router();
const { expenseEntries } = require("../controllers/ExpenseController");
const authGuard = require("../middleware/authGuard");

router.post("/expenseEntries", authGuard, expenseEntries);

module.exports = router;
