const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMember");
const uploadDonation = require("../middleware/uploadDonation");

const homeController = require("../controllers/homeController");
const joinController = require("../controllers/joinController");
const donationController = require("../controllers/donationController");
const galleryController = require("../controllers/galleryController");
const memberController = require("../controllers/memberController");

// Home
router.get("/", homeController.homePage);

// Management
router.get("/management", (req, res) => {
    res.render("management");
});

// Gallery
router.get("/gallery", galleryController.showGallery);

// Public Members
router.get("/members", memberController.showPublicMembers);

// Join
router.get("/join", (req, res) => {
    res.render("join");
});

router.post(
    "/join",
    upload.single("photo"),
    joinController.submitJoin
);

// Donation
router.get(
    "/donation",
    donationController.showDonationPage
);

router.post(
    "/donation",
    uploadDonation.single("screenshot"),
    donationController.submitDonation
);

// Contact
router.get("/contact", (req, res) => {
    res.render("contact");
});

module.exports = router;