const incomeModel = require("../models/incomeModel");
const expenseModel = require("../models/expenseModel");


exports.dashboard = async (req, res) => {

    try {

        const year =
            req.query.year ||
            new Date().getFullYear();

        const totalIncome =
            await incomeModel.getYearIncome(year);

        const totalExpense =
            await expenseModel.getYearExpense(year);
        const incomeSource =
            await incomeModel.getIncomeSourceReport(year);
        const expenseCategory =
            await expenseModel.getExpenseCategoryReport(year);

        const balance =
            Number(totalIncome) -
            Number(totalExpense);
        const recentIncome = await incomeModel.getRecentIncome();

        const recentExpense = await expenseModel.getRecentExpenses();

        res.render("admin/financeDashboard", {

            year,
            totalIncome,
            totalExpense,
            balance,

            incomeSource,
            expenseCategory,

            recentIncome,
            recentExpense

        });

    }
    catch (err) {

        console.log(err);

        res.send(err.message);

    }

};