const db = require("../config/db");

// Add Expense
exports.addExpense = async (expense) => {

    return db.execute(
        `INSERT INTO expenses
        (
            member_id,
            expense_date,
            category,
            item_name,
            quantity,
            price,
            total,
            bill,
            description
        )
        VALUES (?,?,?,?,?,?,?,?,?)`,
        [
            expense.member_id,
            expense.expense_date,
            expense.category,
            expense.item_name,
            expense.quantity,
            expense.price,
            expense.total,
            expense.bill,
            expense.description
        ]
    );

};

// Member Expenses
exports.getMemberExpenses = async (memberId) => {

    const [rows] = await db.execute(
        "SELECT * FROM expenses WHERE member_id=? ORDER BY expense_date DESC",
        [memberId]
    );

    return rows;

};

// Dashboard Statistics
exports.getMemberExpenseStats = async (memberId) => {

    const [rows] = await db.execute(
        `SELECT
            IFNULL(SUM(total),0) AS totalAmount,
            SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,
            SUM(CASE WHEN status='Approved' THEN 1 ELSE 0 END) AS approved,
            SUM(CASE WHEN status='Rejected' THEN 1 ELSE 0 END) AS rejected
        FROM expenses
        WHERE member_id=?`,
        [memberId]
    );

    return rows[0];

};

// All Expenses (Admin)
exports.getAllExpenses = async () => {

    const [rows] = await db.execute(
        `SELECT
            e.*,
            m.fullname,
            m.department
        FROM expenses e
        JOIN members m
            ON e.member_id = m.id
        ORDER BY e.id DESC`
    );

    return rows;

};

// Update Expense Status
exports.updateExpenseStatus = async (id, status) => {

    return db.execute(
        "UPDATE expenses SET status=? WHERE id=?",
        [status, id]
    );

};
exports.getExpensesByMember = async (memberId) => {

    const [rows] = await db.execute(

        `SELECT *
         FROM expenses
         WHERE member_id=?
         ORDER BY id DESC`,

        [memberId]

    );

    return rows;

};
// Delete Expense
exports.deleteExpense = async (id) => {

    return db.execute(
        "DELETE FROM expenses WHERE id=?",
        [id]
    );

};
// Approve / Reject Expense
exports.updateExpenseStatus = async (id, status) => {

    return db.execute(
        "UPDATE expenses SET status=? WHERE id=?",
        [status, id]
    );

};

// Delete Expense
exports.deleteExpense = async (id) => {

    return db.execute(
        "DELETE FROM expenses WHERE id=?",
        [id]
    );

};