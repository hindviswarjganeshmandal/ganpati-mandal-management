const express = require("express");
const router = express.Router();

const memberAuthController = require("../controllers/memberAuthController");
const memberAuth = require("../middleware/memberAuth");

// Login Page
router.get("/login", memberAuthController.showLogin);

// Login
router.post("/login", memberAuthController.login);

// Dashboard
router.get("/dashboard", memberAuth, memberAuthController.dashboard);

// Logout
router.get("/logout", memberAuthController.logout);

module.exports = router;