const db = require("../config/db");


exports.getGallery = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM gallery ORDER BY id DESC LIMIT 6"
    );

    return rows;

};
// Get all photos
exports.getAllPhotos = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM gallery ORDER BY id DESC"
    );

    return rows;

};
exports.getPhotoById = async (id) => {

    const [rows] = await db.query(
        "SELECT * FROM gallery WHERE id = ?",
        [id]
    );

    return rows[0];
};


// Add photo
exports.addPhoto = async (title, image) => {
    return await db.execute(
        "INSERT INTO gallery (title, image) VALUES (?, ?)",
        [title, image]
    );
};



exports.deletePhoto = async (id) => {

    await db.query(
        "DELETE FROM gallery WHERE id = ?",
        [id]
    );

};