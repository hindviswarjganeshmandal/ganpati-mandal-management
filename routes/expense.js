const express = require("express");

const router = express.Router();

const memberAuth = require("../middleware/memberAuth");

const uploadBill = require("../middleware/uploadBill");

const expenseController = require("../controllers/expenseController");

router.get(

    "/add",

    memberAuth,

    expenseController.showAddExpense

);

router.post(

    "/add",

    memberAuth,

    uploadBill.single("bill"),

    expenseController.addExpense

);

router.get(

    "/my",

    memberAuth,

    expenseController.myExpenses

);

module.exports = router;