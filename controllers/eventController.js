const eventModel = require("../models/eventModel");

// Show all events
exports.showEvents = async (req, res) => {
    try {

        const events = await eventModel.getAllEvents();

        res.render("admin/events", {
            events
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }
};

// Add new event
exports.addEvent = async (req, res) => {
    try {

        await eventModel.addEvent(req.body);

        res.redirect("/admin/events");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }
    if (req.file) {

    req.body.image = req.file.filename;

}
};
exports.deleteEvent = async (req, res) => {

    try {

        await eventModel.deleteEvent(req.params.id);

        res.redirect("/admin/events");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};
// Show Edit Form
exports.showEditEvent = async (req, res) => {

    try {

        const event = await eventModel.getEventById(req.params.id);

        res.render("admin/editEvent", {
            event
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Update Event
exports.updateEvent = async (req, res) => {

    try {

        await eventModel.updateEvent(req.params.id, req.body);

        res.redirect("/admin/events");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};