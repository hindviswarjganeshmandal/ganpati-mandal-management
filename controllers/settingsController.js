const settingsModel = require("../models/settingsModel");

exports.showSettings = async (req, res) => {
    try {
        const settings = await settingsModel.getSettings();

        res.render("admin/settings", {
            settings
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};

exports.updateSettings = async (req, res) => {
    try {

        await settingsModel.updateSettings(req.body);

        res.redirect("/admin/settings");

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};