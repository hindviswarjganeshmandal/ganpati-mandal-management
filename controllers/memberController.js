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

    const page = parseInt(req.query.page) || 1;

    const limit = 10;

    const offset = (page - 1) * limit;

    const members = await memberModel.getMembers(limit, offset);

    const total = await memberModel.getMemberCount();

    const totalPages = Math.ceil(total / limit);

    res.render("admin/members", {
        members,
        currentPage: page,
        totalPages,
        search: ""
    });

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