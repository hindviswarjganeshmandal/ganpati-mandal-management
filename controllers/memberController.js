const memberModel = require("../models/memberModel");

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

        const members = await memberModel.getAllMembers();

        res.render("admin/members", {
            members,
            currentPage: 1,
            totalPages: 1,
            search: ""
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