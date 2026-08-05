const expenseModel = require("../models/expenseModel");

// Expense List
exports.showExpenses = async (req, res) => {

    try {

        const expenses = await expenseModel.getAllExpenses();

        res.render("admin/expenses", {
            expenses
        });

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// Approve
exports.approveExpense = async (req, res) => {

    await expenseModel.updateExpenseStatus(
        req.params.id,
        "Approved"
    );

    res.redirect("/admin/expenses");

};

// Reject
exports.rejectExpense = async (req, res) => {

    await expenseModel.updateExpenseStatus(
        req.params.id,
        "Rejected"
    );

    res.redirect("/admin/expenses");

};

// Delete
exports.deleteExpense = async (req, res) => {

    await expenseModel.deleteExpense(
        req.params.id
    );

    res.redirect("/admin/expenses");

};