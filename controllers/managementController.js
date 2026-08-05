const managementModel = require("../models/managementModel");
const memberModel = require("../models/memberModel");

// Show Management Dashboard
exports.showManagement = async (req, res) => {

    try {

        const search = req.query.search || "";
        const month = req.query.month || "";
        const year = req.query.year || "";
        const type = req.query.type || "";

        const transactions =
            await managementModel.searchTransactions(
                search,
                month,
                year,
                type
            );

        const summary =
            await managementModel.getSummary();

        const members =
            await memberModel.getAllMembers();

        const balance =
            Number(summary.income) -
            Number(summary.expense);

        res.render("admin/management", {

            transactions,
            members,

            income: summary.income,
            expense: summary.expense,
            balance,

            search,
            month,
            year,
            type

        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Add Transaction
exports.addTransaction = async (req, res) => {

    try {

        const data = req.body;

        data.total = Number(data.quantity) * Number(data.price);

        await managementModel.addTransaction(data);

        res.redirect("/admin/management");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {

    try {

        await managementModel.deleteTransaction(req.params.id);

        res.redirect("/admin/management");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};