const donationModel = require("../models/donationModel");
const paymentModel = require("../models/paymentModel");
const cloudinary = require("../config/cloudinary");

// ================= Donation Page =================

exports.showDonationPage = async (req, res) => {
    try {

        const payment = await paymentModel.getPayment();

        res.render("donation", {
            payment
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }
};

// ================= Submit Donation =================

exports.submitDonation = async (req, res) => {
    try {

        await donationModel.createDonation({
            fullname: req.body.fullname,
            email: req.body.email,
            amount: req.body.amount,

            screenshot: req.file.path,
            public_id: req.file.filename
        });

        req.flash("success", "Donation submitted successfully");

        res.redirect("/donation");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }
};

// ================= Delete Donation =================

exports.deleteDonation = async (req, res) => {

    try {

        const donation = await donationModel.getDonationById(req.params.id);

        if (donation) {

            await cloudinary.uploader.destroy(donation.public_id);

            await donationModel.deleteDonation(req.params.id);

        }

        req.flash("success", "Donation deleted successfully");

        res.redirect("/admin/donations");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};