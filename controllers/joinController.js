const joinModel = require("../models/joinModel");
const { sendEmail } = require("../utils/email");

exports.submitJoin = async (req, res) => {

    try {

        const data = {
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            photo: req.file ? req.file.filename : ""
        };

        // Save join request
        await joinModel.createJoinRequest(data);

        // Send confirmation email
        await sendEmail(
            data.email,
            "Join Request Received - Shree Ganesh Mandal",
            `
            <h2>🙏 Ganpati Bappa Morya</h2>

            <p>Dear <b>${data.fullname}</b>,</p>

            <p>Your join request has been received successfully.</p>

            <p>Our admin team will review your request soon.</p>

            <p>Thank you for joining Shree Ganesh Mandal.</p>
            `
        );

        res.redirect("/join");

    } catch (err) {

        console.error(err);
        res.status(500).send("Error saving join request.");

    }

};