const express = require("express");
const router = express.Router();

const memberAuth = require("../middleware/memberAuth");
const memberAuthController = require("../controllers/memberAuthController");
const uploadBill = require("../middleware/uploadBill");

// Dashboard
router.get("/dashboard", memberAuth, memberAuthController.dashboard);

// Add Expense Page
router.get("/add-expense", memberAuth, memberAuthController.showAddExpense);

// Save Expense
router.post(
    "/add-expense",
    memberAuth,
    uploadBill.single("bill"),
    memberAuthController.addExpense
);

// My Expenses
router.get("/expenses", memberAuth, memberAuthController.myExpenses);

// Logout
router.get("/logout", memberAuthController.logout);

module.exports = router;