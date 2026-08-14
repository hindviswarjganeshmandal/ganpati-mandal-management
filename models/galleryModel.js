const db = require("../config/db");

exports.addPhoto = async (title, imageUrl, publicId) => {
    await db.execute(
        `INSERT INTO gallery(title,image,public_id)
         VALUES (?,?,?)`,
        [title, imageUrl, publicId]
    );
};

exports.getAllPhotos = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM gallery ORDER BY id DESC"
    );
    return rows;
};

exports.getPhotoById = async (id) => {
    const [rows] = await db.execute(
        "SELECT * FROM gallery WHERE id=?",
        [id]
    );
    return rows[0];
};

exports.deletePhoto = async (id) => {
    await db.execute(
        "DELETE FROM gallery WHERE id=?",
        [id]
    );
};