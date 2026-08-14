const paymentModel = require("../models/paymentModel");
const cloudinary = require("../config/cloudinary");

exports.showPayment = async (req, res) => {

    const payment = await paymentModel.getPayment();

    res.render("admin/payment", { payment });

};

exports.updatePayment = async (req, res) => {

    try {

        const oldPayment = await paymentModel.getPayment();

        if (oldPayment && oldPayment.public_id && req.file) {
            await cloudinary.uploader.destroy(oldPayment.public_id);
        }

        await paymentModel.updatePayment(
            req.body.upi_id,
            req.file.path,
            req.file.filename
        );

        req.flash("success", "Payment QR updated successfully");

        res.redirect("/admin/payment");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};