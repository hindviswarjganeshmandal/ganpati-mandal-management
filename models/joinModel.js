const db = require("../config/db");

async function createJoinRequest(data) {
    const sql = `
        INSERT INTO join_requests
        (fullname, email, phone, address, photo)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        data.fullname,
        data.email,
        data.phone,
        data.address,
        data.photo
    ];

    return db.execute(sql, values);
}

module.exports = {
    createJoinRequest
};