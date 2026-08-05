const donationModel = require("../models/donationModel");
const paymentModel = require("../models/paymentModel");
const { sendEmail } = require("../utils/email");

// ================= Show Donation Page =================

exports.showDonationPage = async (req, res) => {

    try {

        const payment = await paymentModel.getPaymentDetails();

        res.render("donation", {
            payment
        });

    } catch (err) {

        console.log(err);

        res.render("donation", {
            payment: {}
        });

    }

};

// ================= Submit Donation =================

exports.submitDonation = async (req, res) => {

    try {

        await donationModel.createDonation({

            fullname: req.body.fullname,
            email: req.body.email,
            amount: req.body.amount,
            screenshot: req.file.filename

        });

        // Send Email
        await sendEmail(

            req.body.email,

            "Donation Received - Shree Ganesh Mandal",

            `
            <h2>🙏 Thank You</h2>

            <p>Dear <b>${req.body.fullname}</b>,</p>

            <p>We have received your donation successfully.</p>

            <p><b>Donation Amount:</b> ₹${req.body.amount}</p>

            <p>Your payment is currently under verification.</p>

            <br>

            <p>Ganpati Bappa Morya 🙏</p>

            <p>Thank you for supporting Shree Ganesh Mandal.</p>
            `
        );

        res.redirect("/donation");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};