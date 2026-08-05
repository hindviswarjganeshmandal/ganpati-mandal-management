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

// Add photo
exports.addPhoto = async (photo) => {

    return db.execute(
        "INSERT INTO gallery (title,image) VALUES (?,?)",
        [
            photo.title,
            photo.image
        ]
    );

};

// Delete photo
exports.deletePhoto = async (id) => {

    return db.execute(
        "DELETE FROM gallery WHERE id=?",
        [id]
    );

};