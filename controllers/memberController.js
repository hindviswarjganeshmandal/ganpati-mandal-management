const db = require("../config/db");
const memberModel = require("../models/memberModel");
const bcrypt = require("bcrypt");

// ======================
// PUBLIC WEBSITE
// ======================

exports.showPublicMembers = async (req, res) => {

    try {

        const members = await memberModel.getAllMembers();

        res.render("members", {
            members
        });

    } catch (err) {

        console.log(err);

        res.render("members", {
            members: []
        });

    }

};

// ======================
// ADMIN PANEL
// ======================

exports.showMembers = async (req, res) => {
    try {
        const search = req.query.search || "";

        // Approved members
        const [approved] = await db.execute(
            `SELECT *,
                    'Approved' AS status
             FROM members
             WHERE fullname LIKE ? OR email LIKE ?
             ORDER BY id DESC`,
            [`%${search}%`, `%${search}%`]
        );

        // Pending join requests
        const [pending] = await db.execute(
            `SELECT *,
                    'Pending' AS status
             FROM join_requests
             WHERE status='Pending'
             AND (fullname LIKE ? OR email LIKE ?)
             ORDER BY id DESC`,
            [`%${search}%`, `%${search}%`]
        );

        const members = [...pending, ...approved];

        res.render("admin/members", {
            members,
            search,
            currentPage: 1,
            totalPages: 1
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};

exports.deleteMember = async (req, res) => {

    await memberModel.deleteMember(req.params.id);

    res.redirect("/admin/members");

};
exports.showPublicMembers = async (req, res) => {

    try {

        const members = await memberModel.getAllMembers();

        res.render("members", {
            members
        });

    } catch (err) {

        console.log(err);

        res.render("members", {
            members: []
        });

    }

};
exports.myExpenses = async (req, res) => {

    try {

        const member = req.session.member;

        const stats = await expenseModel.getMemberExpenseStats(member.id);

        const expenses = await expenseModel.getExpensesByMember(member.id);

        res.render("member/dashboard", {

            member,

            totalAmount: stats.totalAmount || 0,

            pending: stats.pending || 0,

            approved: stats.approved || 0,

            rejected: stats.rejected || 0,

            expenses

        });

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};
exports.showSetPassword = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM password_tokens WHERE token=?",
            [req.params.token]
        );

        if (rows.length === 0) {
            return res.send("Invalid or expired link");
        }

        res.render("member/setPassword", {
            token: req.params.token
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};

// Save Password
exports.savePassword = async (req, res) => {
    try {
        const { password } = req.body;

        const [rows] = await db.execute(
            "SELECT * FROM password_tokens WHERE token=?",
            [req.params.token]
        );

        if (rows.length === 0) {
            return res.send("Invalid or expired link");
        }

        const hashed = await bcrypt.hash(password, 10);

        await db.execute(
            "UPDATE members SET password=?, can_login=1 WHERE id=?",
            [hashed, rows[0].member_id]
        );

        await db.execute(
            "DELETE FROM password_tokens WHERE token=?",
            [req.params.token]
        );

        res.send("Password created successfully. You can now log in.");

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};