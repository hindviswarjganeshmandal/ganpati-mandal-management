const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.showLogin = (req, res) => {
    res.render("admin/login", {
        error: null
    });
};

exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const [rows] = await db.execute(
            "SELECT * FROM admins WHERE username=?",
            [username]
        );

        if (rows.length === 0) {
            return res.render("admin/login", {
                error: "Invalid Username or Password"
            });
        }

        const admin = rows[0];

        const match = await bcrypt.compare(
            password,
            admin.password
        );

        if (!match) {
            return res.render("admin/login", {
                error: "Invalid Username or Password"
            });
        }

        req.session.admin = {
            id: admin.id,
            username: admin.username
        };

        res.redirect("/admin/dashboard");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/admin/login");
    });

};