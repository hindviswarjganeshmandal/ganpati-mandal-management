const PDFDocument = require("pdfkit");
const donationModel = require("../models/donationModel");

exports.downloadReceipt = async (req, res) => {

    try {

        const id = req.params.id;

        const donation = await donationModel.getDonationById(id);

        if (!donation) {
            return res.send("Donation not found.");
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Receipt-${id}.pdf`
        );

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        doc.pipe(res);

        // Title
        doc
            .fontSize(22)
            .text("Shree Ganesh Mandal", {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(18)
            .text("Donation Receipt", {
                align: "center"
            });

        doc.moveDown(2);

        doc.fontSize(14);
        doc.text(`Receipt No : REC-${String(id).padStart(5, "0")}`);
        doc.text(`Name       : ${donation.fullname}`);
        doc.text(`Email      : ${donation.email}`);
        doc.text(`Amount     : ₹${donation.amount}`);
        doc.text(`Status     : ${donation.status}`);
        doc.text(`Date       : ${new Date().toLocaleDateString()}`);

        doc.moveDown(2);

        doc
            .fontSize(16)
            .text("Thank You For Your Donation 🙏", {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(18)
            .text("Ganpati Bappa Morya!", {
                align: "center"
            });

        doc.end();

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};