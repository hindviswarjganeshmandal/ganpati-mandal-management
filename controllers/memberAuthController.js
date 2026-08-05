const db = require("../config/db");
const bcrypt = require("bcrypt");
const expenseModel = require("../models/expenseModel");

// Login Page
exports.showLogin = (req, res) => {
    res.render("member/login");
};

// Login
exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const [rows] = await db.execute(
            "SELECT * FROM members WHERE username=? AND status='Active'",
            [username]
        );

        if (rows.length === 0) {
            return res.send("Invalid Username");
        }

        const member = rows[0];

        const match = await bcrypt.compare(password, member.password);

        if (!match) {
            return res.send("Invalid Password");
        }

        req.session.member = {
            id: member.id,
            fullname: member.fullname,
            role: member.role,
            department: member.department
        };

        res.redirect("/member/dashboard");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Dashboard
exports.dashboard = async (req, res) => {

    try {

        const memberId = req.session.member.id;

        const expenses = await expenseModel.getMemberExpenses(memberId);

        const stats = await expenseModel.getMemberExpenseStats(memberId);

        res.render("member/dashboard", {

            member: req.session.member,

            expenses: expenses || [],

            totalAmount: stats?.totalAmount || 0,

            pending: stats?.pending || 0,

            approved: stats?.approved || 0,

            rejected: stats?.rejected || 0

        });

    } catch (err) {

        console.log(err);

        res.render("member/dashboard", {

            member: req.session.member,

            expenses: [],

            totalAmount: 0,

            pending: 0,

            approved: 0,

            rejected: 0

        });

    }

};
exports.addExpense = async (req, res) => {

    try {

        const expense = {

            member_id: req.session.member.id,
            expense_date: req.body.expense_date,
            category: req.body.category,
            item_name: req.body.item_name,
            quantity: req.body.quantity,
            price: req.body.price,
            total: req.body.total,
            bill: req.file ? req.file.filename : null,
            description: req.body.description

        };

        await expenseModel.addExpense(expense);

        res.redirect("/member/expenses");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};
exports.myExpenses = async (req, res) => {

    const expenses = await expenseModel.getExpensesByMember(
        req.session.member.id
    );

    res.render("member/expenses", {

        member: req.session.member,

        expenses

    });

};
exports.showAddExpense = (req, res) => {

    res.render("member/addExpense", {
        member: req.session.member
    });

};



// Logout
exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/member/login");
    });

};