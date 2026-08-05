const paymentModel = require("../models/paymentModel");

// Show Payment Details
exports.showPayment = async (req, res) => {

    try {

        const payment = await paymentModel.getPaymentDetails();

        res.render("admin/payment", {
            payment
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// Update Payment
exports.updatePayment = async (req, res) => {

    try {

        if (req.file) {
            req.body.qr_code = req.file.filename;
        } else {
            const payment = await paymentModel.getPaymentDetails();
            req.body.qr_code = payment.qr_code;
        }

        await paymentModel.updatePaymentDetails(req.body);

        res.redirect("/admin/payment");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};