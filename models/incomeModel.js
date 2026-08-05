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
            reference_no,
            description
        )
        VALUES (?,?,?,?,?,?,?)`,
        [
            income.income_date,
            income.source,
            income.amount,
            income.received_from,
            income.payment_method,
            income.reference_no,
            income.description
        ]
    );

};

// Get All Income
exports.getAllIncome = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM income ORDER BY income_date DESC"
    );

    return rows;

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
        SELECT
            IFNULL(SUM(amount),0) AS totalIncome
        FROM income
    `);

    return rows[0];

};