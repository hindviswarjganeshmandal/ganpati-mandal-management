const db = require("../config/db");

// Get payment details
exports.getPaymentDetails = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM payment_details LIMIT 1"
    );

    return rows[0];
};

// Update payment details
exports.updatePaymentDetails = async (data) => {

    return db.execute(
        `UPDATE payment_details
        SET
            upi_id=?,
            account_name=?,
            bank_name=?,
            account_number=?,
            ifsc_code=?,
            mobile=?,
            qr_code=?
        WHERE id=1`,
        [
            data.upi_id,
            data.account_name,
            data.bank_name,
            data.account_number,
            data.ifsc_code,
            data.mobile,
            data.qr_code
        ]
    );

};