const db = require("../config/db");

exports.createDonation = async (data) => {

    return db.execute(
        `INSERT INTO donations
        (fullname,email,amount,screenshot)
        VALUES (?,?,?,?)`,
        [
            data.fullname,
            data.email,
            data.amount,
            data.screenshot
        ]
    );

};

exports.getAllDonations = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM donations ORDER BY id DESC"
    );

    return rows;

};
exports.updateDonationStatus = async (id, status) => {
    return db.execute(
        "UPDATE donations SET status=? WHERE id=?",
        [status, id]
    );
};

exports.getDonationStats = async () => {
    const [rows] = await db.execute(`
        SELECT
            COUNT(*) AS totalDonations,
            SUM(amount) AS totalAmount,
            SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,
            SUM(CASE WHEN status='Verified' THEN 1 ELSE 0 END) AS verified
        FROM donations
    `);

    return rows[0];
};
// Get Donation By ID
exports.getDonationById = async (id) => {

    const [rows] = await db.execute(
        "SELECT * FROM donations WHERE id=?",
        [id]
    );

    return rows[0];

};
