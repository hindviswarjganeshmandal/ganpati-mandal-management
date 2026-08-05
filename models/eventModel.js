const db = require("../config/db");

exports.getAllEvents = async () => {
    const [rows] = await db.execute(
        "SELECT * FROM events ORDER BY event_date ASC"
    );
    return rows;
};

exports.addEvent = async (event) => {
    return db.execute(
        `INSERT INTO events
(title,event_date,event_time,location,description,image)
VALUES (?,?,?,?,?,?)`,
        [
            event.title,
            event.event_date,
            event.event_time,
            event.location,
            event.description,
             event.image
        ]
    );
};
exports.deleteEvent = async (id) => {

    return db.execute(
        "DELETE FROM events WHERE id=?",
        [id]
    );

};
// Get single event
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