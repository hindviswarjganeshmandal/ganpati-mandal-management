const db = require("../config/db");
const bcrypt = require("bcrypt");
const expenseModel = require("../models/expenseModel");
const memberModel = require("../models/memberModel");
// Dashboard
exports.dashboard = async (req, res) => {

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

// Show Profile
exports.showProfile = async (req, res) => {

    try {

        const member = await memberModel.getMemberById(
            req.session.member.id
        );

        res.render("member/profile", {

            member

        });

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// Update Profile
exports.updateProfile = async (req, res) => {

    try {

        await memberModel.updateProfile(

            req.session.member.id,

            req.body

        );

        // Refresh session

        req.session.member = await memberModel.getMemberById(

            req.session.member.id

        );

        res.redirect("/member/profile");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};
// Show Change Password Page
exports.showPassword = (req, res) => {

    res.render("member/changePassword");

};

// Update Password
exports.updatePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.send("All fields are required.");
        }

        if (newPassword !== confirmPassword) {
            return res.send("New Password and Confirm Password do not match.");
        }

        const [rows] = await db.execute(
            "SELECT * FROM members WHERE id=?",
            [req.session.member.id]
        );

        if (rows.length === 0) {
            return res.send("Member not found.");
        }

        const member = rows[0];

        const match = await bcrypt.compare(currentPassword, member.password);

        if (!match) {
            return res.send("Current Password is incorrect.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.execute(
            "UPDATE members SET password=? WHERE id=?",
            [hashedPassword, member.id]
        );

        res.send("Password updated successfully.");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};