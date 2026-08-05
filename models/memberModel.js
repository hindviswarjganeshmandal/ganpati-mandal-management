const memberModel = require("../models/memberModel");
const db = require("../config/db");

// Get all members
exports.getAllMembers = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM members ORDER BY id DESC"
    );

    return rows;
};

// ================= PUBLIC MEMBERS =================

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

// ================= ADMIN MEMBERS =================

exports.showMembers = async (req, res) => {

    try {

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

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};
exports.getAllMembers = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM members ORDER BY id DESC"
    );

    return rows;

};

exports.deleteMember = async (req, res) => {

    await memberModel.deleteMember(req.params.id);

    res.redirect("/admin/members");

};