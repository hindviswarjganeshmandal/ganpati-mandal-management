const db = require("../config/db");

exports.addNews = async (title, description) => {
    return db.execute(
        "INSERT INTO news (title, description) VALUES (?, ?)",
        [title, description]
    );
};

exports.getAllNews = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM news ORDER BY id DESC"
    );
    return rows;
};

exports.getLatestNews = async (limit = 3) => {

    const [rows] = await db.query(
        `SELECT * FROM news ORDER BY id DESC LIMIT ${Number(limit)}`
    );

    return rows;

};
exports.getAllNews = async () => {

    const [rows] = await db.execute(
        "SELECT * FROM news ORDER BY id DESC"
    );

    return rows;

};