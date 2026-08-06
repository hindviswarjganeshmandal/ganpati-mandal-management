const accountModel = require("../models/accountModel");

exports.showAccounts = async (req, res) => {

    try {

        // Get selected year or current year
        const year = req.query.year || new Date().getFullYear();

        // Fetch data
        const totalIncome = await accountModel.getYearIncome(year);
        const totalExpense = await accountModel.getYearExpense(year);

        const incomeList = await accountModel.getYearIncomeList(year);
        const expenseList = await accountModel.getYearExpenseList(year);

        // Render page
        res.render("accounts", {
            year,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            incomeList,
            expenseList
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};