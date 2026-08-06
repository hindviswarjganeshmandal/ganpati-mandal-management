const express = require("express");
const router = express.Router();
const uploadExpense = require("../middleware/uploadExpense");
const memberAuthController = require("../controllers/memberAuthController");
const memberDashboardController = require("../controllers/memberDashboardController");
const expenseController = require("../controllers/expenseController");
const memberAuth = require("../middleware/memberAuth");
router.get("/add-expense", memberAuth, expenseController.showAddExpense);

// Login
router.get("/login", memberAuthController.showLogin);
router.post("/login", memberAuthController.login);

// Dashboard
router.get(
    "/dashboard",
    memberAuth,
    memberDashboardController.dashboard
);

// Add Expense
router.post(
    "/expense/add",
    memberAuth,
    uploadExpense.single("bill"),
    expenseController.addExpense
);
// My Expenses
router.get(
    "/expenses",
    memberAuth,
    expenseController.myExpenses
);

// Delete My Expense
router.get(
    "/expense/delete/:id",
    memberAuth,
    expenseController.deleteMyExpense
);

// Logout
router.get(
    "/logout",
    memberAuthController.logout
);
// Show Add Expense Page
router.get(
    "/add-expense",
    memberAuth,
    expenseController.showAddExpense
);

// Save Expense
router.post(
    "/expense/add",
    memberAuth,
    expenseController.addExpense
);
// My Profile
router.get(
    "/profile",
    memberAuth,
    memberDashboardController.showProfile
);

router.post(
    "/profile",
    memberAuth,
    memberDashboardController.updateProfile
);
// Change Password
router.get(
    "/password",
    memberAuth,
    memberDashboardController.showPassword
);

router.post(
    "/password",
    memberAuth,
    memberDashboardController.updatePassword
);
module.exports = router;