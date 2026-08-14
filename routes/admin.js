const express = require("express");
const router = express.Router();
const db = require("../config/db");
const donationModel = require("../models/donationModel");
const galleryController = require("../controllers/galleryController");
const uploadGallery = require("../middleware/uploadGallery");
const newsController = require("../controllers/newsController");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");
const memberController = require("../controllers/memberController");
const settingsController = require("../controllers/settingsController");
const eventController = require("../controllers/eventController");
const eventUpload = require("../middleware/eventUpload");
const paymentController = require("../controllers/paymentController");
const paymentUpload = require("../middleware/paymentUpload");
const receiptController = require("../controllers/receiptController");
const exportController = require("../controllers/exportController");
const profileController = require("../controllers/profileController");
const { sendEmail } = require("../utils/email");
const expenseController = require("../controllers/expenseController");
const adminExpenseController = require("../controllers/adminExpenseController");
const managementController = require("../controllers/managementController");
const incomeController = require("../controllers/incomeController");
const financeController = require("../controllers/financeController");
const financeExportController = require("../controllers/financeExportController");
const bcrypt = require("bcrypt");
// ================= Dashboard =================

router.get("/dashboard", auth, async (req, res) => {
    try {

        const [[member]] = await db.execute(
            "SELECT COUNT(*) AS total FROM members"
        );

        const [[join]] = await db.execute(
            "SELECT COUNT(*) AS total FROM join_requests WHERE status='Pending'"
        );

        const [[event]] = await db.execute(
            "SELECT COUNT(*) AS total FROM events"
        );

        const [[news]] = await db.execute(
            "SELECT COUNT(*) AS total FROM news"
        );

        const [[donation]] = await db.execute(
            "SELECT COUNT(*) AS total FROM donations"
        );

        const [[pendingDonation]] = await db.execute(
            "SELECT COUNT(*) AS total FROM donations WHERE status='Pending'"
        );

        const [recentJoins] = await db.execute(`
            SELECT id, fullname, email, status
            FROM join_requests
            ORDER BY id DESC
            LIMIT 5
        `);

        const [recentDonations] = await db.execute(`
            SELECT id, fullname, amount, status
            FROM donations
            ORDER BY id DESC
            LIMIT 5
        `);

        const [latestEvents] = await db.execute(`
            SELECT * FROM events
            ORDER BY id DESC
            LIMIT 5
        `);

        const [latestNews] = await db.execute(`
            SELECT * FROM news
            ORDER BY id DESC
            LIMIT 5
        `);

        const [monthlyDonations] = await db.execute(`
            SELECT MONTH(created_at) AS month,
                   SUM(amount) AS total
            FROM donations
            WHERE status='Verified'
            GROUP BY MONTH(created_at)
            ORDER BY MONTH(created_at)
        `);

        res.render("admin/dashboard", {
            memberCount: member.total,
            joinCount: join.total,
            eventCount: event.total,
            newsCount: news.total,
            donationCount: donation.total,
            pendingDonationCount: pendingDonation.total,
            recentJoins,
            recentDonations,
            latestEvents,
            latestNews,
            monthlyDonations
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
});

// ================= Approve Member =================

router.get("/approve/:id", auth, async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await db.execute(
            "SELECT * FROM join_requests WHERE id=?",
            [id]
        );

        if (rows.length === 0) {
            return res.redirect("/admin/dashboard");
        }

        const member = rows[0];
        // Temporary password
        const tempPassword = "Ganpati@123";

        // Encrypt password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        await db.execute(
            `INSERT INTO members
(fullname,email,phone,address,photo,password)
VALUES (?,?,?,?,?,?)`,
            [
                member.fullname,
                member.email,
                member.phone,
                member.address,
                member.photo,
                hashedPassword
            ]
        );

        await db.execute(
            "UPDATE join_requests SET status='Approved' WHERE id=?",
            [id]
        );
        // Send approval email
        await sendEmail(
            member.email,
            "Membership Approved - Shree Ganesh Mandal",
            `
    <h2>🎉 Congratulations</h2>

    <p>Dear <b>${member.fullname}</b>,</p>

    <p>Your membership request has been approved successfully.</p>

    <p>Welcome to <b>Shree Ganesh Mandal</b>.</p>

    <br>

    <p>Ganpati Bappa Morya 🙏</p>
    `
        );

        res.redirect("/admin/dashboard");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

});

// ================= Reject Member =================

router.get("/reject/:id", auth, async (req, res) => {

    try {

        await db.execute(
            "UPDATE join_requests SET status='Rejected' WHERE id=?",
            [req.params.id]
        );

        res.redirect("/admin/dashboard");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

});

// ================= Donation List =================

router.get("/donations", auth, async (req, res) => {

    try {

        const donations = await donationModel.getAllDonations();

        res.render("admin/donations", {
            donations
        });

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

});

// ================= Verify Donation =================

router.get("/donations/verify/:id", auth, async (req, res) => {

    await donationModel.updateDonationStatus(
        req.params.id,
        "Verified"
    );

    res.redirect("/admin/donations");

});

// ================= Reject Donation =================

// Reject Donation
router.get("/donations/reject/:id", auth, async (req, res) => {
    await donationModel.updateDonationStatus(
        req.params.id,
        "Rejected"
    );

    req.flash("success", "Donation rejected successfully");
    res.redirect("/admin/donations");
});
// ================= Gallery =================

router.get(
    "/gallery",
    auth,
    galleryController.showAdminGallery
);

router.post(
    "/gallery/upload",
    auth,
    uploadGallery.single("image"),
    galleryController.uploadPhoto
);

router.get(
    "/gallery/delete/:id",
    auth,
    galleryController.deletePhoto
);
// ================= NEWS =================

// News Page
router.get("/news", auth, newsController.showAdminNews);

// Add News
router.post("/news/add", auth, newsController.addNews);
// Login
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

// ================= Members =================

router.get(
    "/members",
    auth,
    memberController.showMembers
);

router.get(
    "/members/delete/:id",
    auth,
    memberController.deleteMember
);

// ================= SETTINGS =================

router.get(
    "/settings",
    auth,
    settingsController.showSettings
);

router.post(
    "/settings",
    auth,
    settingsController.updateSettings
);
// ================= EVENTS =================

router.get(
    "/events",
    auth,
    eventController.showEvents
);

router.post(
    "/events/add",
    auth,
    eventUpload.single("image"),
    eventController.addEvent
);
router.get(
    "/events/delete/:id",
    auth,
    eventController.deleteEvent
);
// Edit Event
router.get(
    "/events/edit/:id",
    auth,
    eventController.showEditEvent
);

router.post(
    "/events/edit/:id",
    auth,
    eventController.updateEvent
);
// ================= PAYMENT =================

router.get(
    "/payment",
    auth,
    paymentController.showPayment
);

router.post(
    "/payment",
    auth,
    paymentUpload.single("qr_code"),
    paymentController.updatePayment
);
// Download Donation Receipt
router.get(
    "/donations/receipt/:id",
    auth,
    receiptController.downloadReceipt
);
router.get(
    "/export/members",
    auth,
    exportController.exportMembers
);
router.get("/reports", auth, (req, res) => {

    res.render("admin/reports");

});
router.get(
    "/profile",
    auth,
    profileController.showProfile
);

router.post(
    "/profile",
    auth,
    profileController.updateProfile
);
router.get(
    "/export/events",
    auth,
    exportController.exportEvents
);
router.get(
    "/export/donations",
    auth,
    exportController.exportDonations
);
router.get(
    "/export/news",
    auth,
    exportController.exportNews
);

// ================= EXPENSE MANAGEMENT =================

router.get(
    "/expenses",
    auth,
    expenseController.adminExpenses
);

router.get(
    "/expenses/approve/:id",
    auth,
    expenseController.approveExpense
);

router.get(
    "/expenses/reject/:id",
    auth,
    expenseController.rejectExpense
);

router.get(
    "/expenses/delete/:id",
    auth,
    expenseController.deleteExpense
);
// ================= MANAGEMENT =================

// Management Dashboard
router.get(
    "/management",
    auth,
    managementController.showManagement
);

// Save Transaction
router.post(
    "/management/add",
    auth,
    managementController.addTransaction
);

// Delete Transaction
router.get(
    "/management/delete/:id",
    auth,
    managementController.deleteTransaction
);
// ================= INCOME =================

// Income List
router.get(
    "/income",
    auth,
    incomeController.showIncome
);

// Add Income
router.post(
    "/income/add",
    auth,
    incomeController.addIncome
);

// Edit Income Page
router.get(
    "/income/edit/:id",
    auth,
    incomeController.showEditIncome
);

// Update Income
router.post(
    "/income/edit/:id",
    auth,
    incomeController.updateIncome
);

// Delete Income
router.get(
    "/income/delete/:id",
    auth,
    incomeController.deleteIncome
);
router.get(
    "/finance",
    auth,
    financeController.dashboard
);
// ================= FINANCE EXPORT =================

// Export PDF
router.get(
    "/finance/export/pdf",
    auth,
    financeExportController.exportPDF
);

// Export Excel
router.get(
    "/finance/export/excel",
    auth,
    financeExportController.exportExcel
);
module.exports = router;
