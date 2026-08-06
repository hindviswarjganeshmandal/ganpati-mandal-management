const db = require("../config/db");

// Total Income by Year
exports.getYearIncome = async (year) => {

    const [rows] = await db.execute(
        `
        SELECT IFNULL(SUM(amount),0) AS total
        FROM income
        WHERE YEAR(income_date)=?
        `,
        [year]
    );

    return rows[0].total;

};

// Total Approved Expense by Year
exports.getYearExpense = async (year) => {

    const [rows] = await db.execute(
        `
        SELECT IFNULL(SUM(total),0) AS total
        FROM expenses
        WHERE YEAR(expense_date)=?
        AND status='Approved'
        `,
        [year]
    );

    return rows[0].total;

};

// Income List by Year
exports.getYearIncomeList = async (year) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM income
        WHERE YEAR(income_date)=?
        ORDER BY income_date DESC
        `,
        [year]
    );

    return rows;

};

// Expense List by Year
exports.getYearExpenseList = async (year) => {

    const [rows] = await db.execute(
        `
        SELECT
            e.*,
            m.fullname
        FROM expenses e
        LEFT JOIN members m
        ON e.member_id = m.id
        WHERE YEAR(e.expense_date)=?
        AND e.status='Approved'
        ORDER BY e.expense_date DESC
        `,
        [year]
    );

    return rows;

};