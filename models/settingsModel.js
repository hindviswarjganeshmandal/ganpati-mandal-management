const db = require("../config/db");

exports.getSettings = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM settings WHERE id = 1"
    );
    return rows[0];
};

exports.updateSettings = async (data) => {
    return db.execute(
        `UPDATE settings
         SET
            mandal_name=?,
            phone=?,
            email=?,
            address=?,
            about=?,
            facebook=?,
            instagram=?,
            youtube=?
         WHERE id=1`,
        [
            data.mandal_name,
            data.phone,
            data.email,
            data.address,
            data.about,
            data.facebook,
            data.instagram,
            data.youtube
        ]
    );
};