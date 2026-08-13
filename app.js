// ================================
// IMPORT PACKAGES
// ================================

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");

// ================================
// LOAD ENV
// ================================

dotenv.config();

// ================================
// CREATE EXPRESS APP
// ================================

const app = express();

// ================================
// DATABASE
// ================================

require("./config/db");
const settingsModel = require("./models/settingsModel");

// ================================
// ROUTES
// ================================

const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const memberRoutes = require("./routes/member");
const expenseRoutes = require("./routes/expense");

// ================================
// EMAIL
// ================================

const { sendEmail } = require("./utils/email");

// ================================
// MIDDLEWARE
// ================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ================================
// SESSION
// ================================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "ganpati_secret",
        resave: false,
        saveUninitialized: false
    })
);

// ================================
// FLASH
// ================================

app.use(flash());

app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
      res.locals.messages = req.flash();

    next();

});

// ================================
// VIEW ENGINE
// ================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================================
// GLOBAL SETTINGS
// ================================

app.use(async (req, res, next) => {

    try {

        const settings = await settingsModel.getSettings();

        res.locals.settings = settings || {};

    } catch (err) {

        console.log(err);

        res.locals.settings = {};

    }

    next();

});

// ================================
// WEBSITE ROUTES
// ================================

app.use("/", indexRoutes);

// ================================
// ADMIN ROUTES
// ================================

app.use("/admin", adminRoutes);

// ================================
// MEMBER ROUTES
// ================================

app.use("/member", memberRoutes);

// ================================
// EXPENSE ROUTES
// ================================

app.use("/expense", expenseRoutes);

// ================================
// TEST EMAIL
// ================================

app.get("/test-email", async (req, res) => {

    try {

        await sendEmail(

            "johnshead37@gmail.com",

            "Test Email",

            "<h2>Ganpati Mandal Email Working ✅</h2>"

        );

        res.send("✅ Email Sent Successfully");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

});

// ================================
// 404 PAGE
// ================================

app.use((req, res) => {

    res.status(404).send("404 - Page Not Found");

});

// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});