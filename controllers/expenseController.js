const expenseModel = require("../models/expenseModel");

exports.showAddExpense = (req, res) => {

    res.render("member/addExpense");

};

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

        res.redirect("/expense/my");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

exports.myExpenses = async (req, res) => {

    const expenses = await expenseModel.getExpensesByMember(

        req.session.member.id

    );

    res.render("member/myExpenses", {

        expenses

    });

};
// Admin Expense List
exports.adminExpenses = async (req, res) => {

    const expenses = await expenseModel.getAllExpenses();

    res.render("admin/expenses", {

        expenses

    });

};

// Approve
exports.approveExpense = async (req, res) => {

    await expenseModel.updateStatus(

        req.params.id,

        "Approved"

    );

    res.redirect("/admin/expenses");

};

// Reject
exports.rejectExpense = async (req, res) => {

    await expenseModel.updateStatus(

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