const incomeModel = require("../models/incomeModel");
const expenseModel = require("../models/expenseModel");
const db = require("../config/db");

exports.dashboard = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();

        // Manual Income
        const incomeTotal = await incomeModel.getYearIncome(year);

        // Verified Donations
        const [[donation]] = await db.execute(`
            SELECT IFNULL(SUM(amount),0) AS total
            FROM donations
            WHERE status='Verified'
            AND YEAR(created_at)=?
        `, [year]);

        // Expenses
        const totalExpense = await expenseModel.getYearExpense(year);

        const incomeSource = await incomeModel.getIncomeSourceReport(year);
        const expenseCategory = await expenseModel.getExpenseCategoryReport(year);

        const recentIncome = await incomeModel.getRecentIncome();
        const recentExpense = await expenseModel.getRecentExpenses();

        // Total Amount = Income + Verified Donations
        const totalAmount = Number(incomeTotal) + Number(donation.total);

        const balance = totalAmount - Number(totalExpense);

        res.render("admin/financeDashboard", {
            year,

            incomeTotal,
            donationTotal: donation.total,
            totalAmount,
            totalExpense,
            balance,

            incomeSource,
            expenseCategory,

            recentIncome,
            recentExpense
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};