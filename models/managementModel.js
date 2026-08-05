const db = require("../config/db");

// Add Transaction
exports.addTransaction = async (data) => {

    return db.execute(
        `INSERT INTO management
        (
            transaction_date,
            type,
            category,
            item_name,
            quantity,
            price,
            total,
            member_id,
            description
        )
        VALUES (?,?,?,?,?,?,?,?,?)`,
        [
            data.transaction_date,
            data.type,
            data.category,
            data.item_name,
            data.quantity,
            data.price,
            data.total,
            data.member_id || null,
            data.description
        ]
    );

};

// Get All Transactions
exports.getAllTransactions = async () => {

    const [rows] = await db.execute(`
        SELECT
            management.*,
            members.fullname
        FROM management
        LEFT JOIN members
        ON management.member_id = members.id
        ORDER BY management.transaction_date DESC
    `);

    return rows;

};

// Dashboard Summary
exports.getSummary = async () => {

    const [[summary]] = await db.execute(`
        SELECT
            IFNULL(SUM(CASE WHEN type='Income' THEN total END),0) AS income,
            IFNULL(SUM(CASE WHEN type='Expense' THEN total END),0) AS expense
        FROM management
    `);

    return summary;

};

// Delete Transaction
exports.deleteTransaction = async (id) => {

    return db.execute(
        "DELETE FROM management WHERE id=?",
        [id]
    );

};
// Search & Filter Transactions
exports.searchTransactions = async (search, month, year, type) => {

    let sql = `
        SELECT
            management.*,
            members.fullname
        FROM management
        LEFT JOIN members
        ON management.member_id = members.id
        WHERE 1=1
    `;

    let values = [];

    if (search) {
        sql += ` AND (
            item_name LIKE ?
            OR category LIKE ?
            OR members.fullname LIKE ?
        )`;

        values.push(
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        );
    }

    if (month) {
        sql += " AND MONTH(transaction_date)=?";
        values.push(month);
    }

    if (year) {
        sql += " AND YEAR(transaction_date)=?";
        values.push(year);
    }

    if (type) {
        sql += " AND type=?";
        values.push(type);
    }

    sql += " ORDER BY transaction_date DESC";

    const [rows] = await db.execute(sql, values);

    return rows;
};