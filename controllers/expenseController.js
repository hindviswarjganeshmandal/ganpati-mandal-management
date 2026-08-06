const expenseModel = require("../models/expenseModel");

// ================= MEMBER =================

// Show Add Expense Page
exports.showAddExpense = (req, res) => {

    res.render("member/addExpense");

};

// Save Expense
exports.addExpense = async (req, res) => {

    try {

        await expenseModel.addExpense({

            member_id: req.session.member.id,

            expense_date: req.body.expense_date,

            category: req.body.category,

            item_name: req.body.item_name,

            quantity: req.body.quantity,

            price: req.body.price,

            total: req.body.total,

            bill: req.file ? req.file.filename : "",

            description: req.body.description

        });

        res.redirect("/member/expenses");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// My Expenses
exports.myExpenses = async (req, res) => {

    try {

        const expenses = await expenseModel.getExpensesByMember(
            req.session.member.id
        );

        res.render("member/myExpenses", {

            member: req.session.member,
            expenses

        });

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// Delete My Expense
exports.deleteMyExpense = async (req, res) => {

    try {

        await expenseModel.deleteExpense(req.params.id);

        res.redirect("/member/expenses");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// ================= ADMIN =================

// Show All Expenses
exports.adminExpenses = async (req, res) => {

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

// Approve Expense
exports.approveExpense = async (req, res) => {

    try {

        await expenseModel.updateExpenseStatus(

            req.params.id,

            "Approved"

        );

        res.redirect("/admin/expenses");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// Reject Expense
exports.rejectExpense = async (req, res) => {

    try {

        await expenseModel.updateExpenseStatus(

            req.params.id,

            "Rejected"

        );

        res.redirect("/admin/expenses");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// Delete Expense
exports.deleteExpense = async (req, res) => {

    try {

        await expenseModel.deleteExpense(req.params.id);

        res.redirect("/admin/expenses");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};