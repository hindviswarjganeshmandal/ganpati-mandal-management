const incomeModel = require("../models/incomeModel");

// Show Income Page
exports.showIncome = async (req, res) => {

    try {

        const income = await incomeModel.getAllIncome();
        const total = await incomeModel.getTotalIncome();

        res.render("admin/income", {

            income,
            totalIncome: total.totalIncome

        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Add Income
exports.addIncome = async (req, res) => {

    try {

        await incomeModel.addIncome(req.body);

        res.redirect("/admin/income");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Delete Income
exports.deleteIncome = async (req, res) => {

    try {

        await incomeModel.deleteIncome(req.params.id);

        res.redirect("/admin/income");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};