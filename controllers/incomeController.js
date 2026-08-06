

// Show Income Page
const incomeModel = require("../models/incomeModel");

exports.showIncome = async (req, res) => {

    try {

        const search = req.query.search || "";
        const month = req.query.month || "";
        const year = req.query.year || "";
        const payment_method = req.query.payment_method || "";

        const income = await incomeModel.searchIncome(
            search,
            month,
            year,
            payment_method
        );

        const totalIncome = await incomeModel.getTotalIncome();

        res.render("admin/income", {

            income,

            totalIncome,

            search,

            month,

            year,

            payment_method

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

// Show Edit Page
exports.showEditIncome = async (req, res) => {

    try {

        const income = await incomeModel.getIncomeById(req.params.id);

        res.render("admin/editIncome", {
            income
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Update Income
exports.updateIncome = async (req, res) => {

    try {

        await incomeModel.updateIncome(
            req.params.id,
            req.body
        );

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