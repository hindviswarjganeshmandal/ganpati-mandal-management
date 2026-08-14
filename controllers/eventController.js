const eventModel = require("../models/eventModel");
const cloudinary = require("../config/cloudinary");

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

        await eventModel.addEvent(
            req.body.title,
            req.body.description,
            req.body.event_date,
            req.file.path,
            req.file.filename
        );

        req.flash("success", "Event added successfully");
        res.redirect("/admin/events");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }
};
exports.deleteEvent = async (req, res) => {

    try {

        const event = await eventModel.getEventById(req.params.id);

        if (event) {

            await cloudinary.uploader.destroy(event.public_id);

            await eventModel.deleteEvent(req.params.id);

        }

        req.flash("success", "Event deleted successfully");
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