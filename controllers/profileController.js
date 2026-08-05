const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.showProfile = async (req, res) => {

    const [rows] = await db.execute(
        "SELECT id, username FROM admins WHERE id=?",
        [req.session.admin.id]
    );

    res.render("admin/profile", {
        admin: rows[0]
    });

};

exports.updateProfile = async (req, res) => {

    const { username, password } = req.body;

    if (password && password.trim() !== "") {

        const hash = await bcrypt.hash(password, 10);

        await db.execute(
            "UPDATE admins SET username=?, password=? WHERE id=?",
            [username, hash, req.session.admin.id]
        );

    } else {

        await db.execute(
            "UPDATE admins SET username=? WHERE id=?",
            [username, req.session.admin.id]
        );

    }

    res.redirect("/admin/profile");

};