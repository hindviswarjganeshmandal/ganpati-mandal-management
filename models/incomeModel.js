const db = require("../config/db");

// Add Income
exports.addIncome = async (income) => {

    return db.execute(
        `INSERT INTO income
        (
            income_date,
            source,
            amount,
            received_from,
            payment_method,
            description
        )
        VALUES (?,?,?,?,?,?)`,
        [
            income.income_date,
            income.source,
            income.amount,
            income.received_from,
            income.payment_method,
            income.description
        ]
    );

};

// Get All Income
exports.getAllIncome = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM income ORDER BY income_date DESC, id DESC"
    );

    return rows;

};

// Get Income By ID
exports.getIncomeById = async (id) => {

    const [rows] = await db.execute(
        "SELECT * FROM income WHERE id=?",
        [id]
    );

    return rows[0];

};

// Update Income
exports.updateIncome = async (id, income) => {

    return db.execute(
        `UPDATE income SET
            income_date=?,
            source=?,
            amount=?,
            received_from=?,
            payment_method=?,
            description=?
        WHERE id=?`,
        [
            income.income_date,
            income.source,
            income.amount,
            income.received_from,
            income.payment_method,
            income.description,
            id
        ]
    );

};

// Delete Income
exports.deleteIncome = async (id) => {

    return db.execute(
        "DELETE FROM income WHERE id=?",
        [id]
    );

};

// Total Income
exports.getTotalIncome = async () => {

    const [rows] = await db.execute(`
        SELECT IFNULL(SUM(amount),0) AS total
        FROM income
    `);

    return rows[0].total;

};
// Search & Filter Income
exports.searchIncome = async (
    search,
    month,
    year,
    payment_method
) => {

    let sql = `
        SELECT *
        FROM income
        WHERE 1=1
    `;

    let values = [];

    if (search) {

        sql += `
            AND (
                source LIKE ?
                OR received_from LIKE ?
            )
        `;

        values.push(`%${search}%`);
        values.push(`%${search}%`);
    }

    if (month) {

        sql += " AND MONTH(income_date)=?";
        values.push(month);

    }

    if (year) {

        sql += " AND YEAR(income_date)=?";
        values.push(year);

    }

    if (payment_method) {

        sql += " AND payment_method=?";
        values.push(payment_method);

    }

    sql += " ORDER BY income_date DESC";

    const [rows] = await db.execute(sql, values);

    return rows;

};
exports.getYearIncome = async(year)=>{

    const [rows] = await db.execute(

        `
        SELECT
        IFNULL(SUM(amount),0) total
        FROM income
        WHERE YEAR(income_date)=?
        `,

        [year]

    );

    return rows[0].total;

};
exports.getIncomeSourceReport = async (year) => {

    const [rows] = await db.execute(
        `
        SELECT
            source,
            SUM(amount) AS total
        FROM income
        WHERE YEAR(income_date)=?
        GROUP BY source
        ORDER BY total DESC
        `,
        [year]
    );

    return rows;

};
exports.getAllIncome = async (year) => {

    const [rows] = await db.execute(
        `
        SELECT
            income_date AS date,
            source,
            amount,
            payment_method
        FROM income
        WHERE YEAR(income_date)=?
        ORDER BY income_date DESC
        `,
        [year]
    );

    return rows;

};
exports.getRecentIncome = async () => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM income
        ORDER BY id DESC
        LIMIT 5
        `
    );

    return rows;

};