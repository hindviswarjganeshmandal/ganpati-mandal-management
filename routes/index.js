const express = require("express");
const router = express.Router();

// ================= Middleware =================

const upload = require("../middleware/uploadMember");
const uploadDonation = require("../middleware/uploadDonation");

// ================= Controllers =================

const homeController = require("../controllers/homeController");
const joinController = require("../controllers/joinController");
const donationController = require("../controllers/donationController");
const galleryController = require("../controllers/galleryController");
const memberController = require("../controllers/memberController");
const accountController = require("../controllers/accountController");
const accountExportController = require("../controllers/accountExportController");

// ======================================================
// HOME
// ======================================================

router.get("/", homeController.homePage);

// ======================================================
// MANAGEMENT
// ======================================================

router.get("/management", (req, res) => {
    res.render("management");
});

// ======================================================
// GALLERY
// ======================================================

router.get(
    "/gallery",
    galleryController.showGallery
);

// ======================================================
// MEMBERS
// ======================================================

router.get(
    "/members",
    memberController.showPublicMembers
);

// ======================================================
// JOIN US
// ======================================================

router.get("/join", (req, res) => {
    res.render("join");
});

router.post(
    "/join",
    upload.single("photo"),
    joinController.submitJoin
);

// ======================================================
// DONATION
// ======================================================

router.get(
    "/donation",
    donationController.showDonationPage
);

router.post(
    "/donation",
    uploadDonation.single("screenshot"),
    donationController.submitDonation
);

// ======================================================
// CONTACT
// ======================================================

router.get("/contact", (req, res) => {
    res.render("contact");
});

// ======================================================
// ACCOUNTS
// ======================================================

router.get(
    "/accounts",
    accountController.showAccounts
);

// Export Accounts PDF
router.get(
    "/accounts/export/pdf",
    accountExportController.exportPDF
);

// Export Accounts Excel
router.get(
    "/accounts/export/excel",
    accountExportController.exportExcel
);

// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;