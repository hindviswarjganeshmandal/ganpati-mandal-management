router.get("/donations/verify/:id", auth, async (req, res) => {

    try {

        const donation = await donationModel.getDonationById(req.params.id);

        await donationModel.updateDonationStatus(
            req.params.id,
            "Verified"
        );

        await sendEmail(
            donation.email,
            "Donation Verified - Shree Ganesh Mandal",
            `
            <h2>🙏 Thank You</h2>

            <p>Dear <b>${donation.fullname}</b>,</p>

            <p>Your donation of <b>₹${donation.amount}</b> has been successfully verified.</p>

            <p>Thank you for supporting Shree Ganesh Mandal.</p>

            <br>

            <b>Ganpati Bappa Morya 🙏</b>
            `
        );

        res.redirect("/admin/donations");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

});