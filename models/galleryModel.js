const db = require("../config/db");

// ================= Add Photo =================

exports.addPhoto = async (title, image, public_id) => {
    return db.execute(
        `INSERT INTO gallery (title, image, public_id)
         VALUES (?,?,?)`,
        [title, image, public_id]
    );
};

// ================= Get All Photos =================

exports.getAllPhotos = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM gallery ORDER BY id DESC"
    );
    return rows;
};

// ================= Get Photo By ID =================

exports.getPhotoById = async (id) => {
    const [rows] = await db.execute(
        "SELECT * FROM gallery WHERE id=?",
        [id]
    );
    return rows[0];
};

// ================= Delete Photo =================

exports.deletePhoto = async (id) => {
    return db.execute(
        "DELETE FROM gallery WHERE id=?",
        [id]
    );
};