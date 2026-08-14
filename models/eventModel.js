const db = require("../config/db");

exports.addEvent = async (title, description, date, image, publicId) => {
    await db.execute(
        `INSERT INTO events
        (title, description, event_date, image, public_id)
        VALUES (?,?,?,?,?)`,
        [title, description, date, image, publicId]
    );
};

exports.getAllEvents = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM events ORDER BY event_date DESC"
    );
    return rows;
};

exports.deleteEvent = async (id) => {
    await db.execute("DELETE FROM events WHERE id=?", [id]);
};

exports.getEventById = async (id) => {
    const [rows] = await db.execute(
        "SELECT * FROM events WHERE id=?",
        [id]
    );
    return rows[0];
};
// Update event
exports.updateEvent = async (id, event) => {

    return db.execute(
        `UPDATE events
        SET title=?,
            event_date=?,
            event_time=?,
            location=?,
            description=?
        WHERE id=?`,
        [
            event.title,
            event.event_date,
            event.event_time,
            event.location,
            event.description,
            id
        ]
    );

};