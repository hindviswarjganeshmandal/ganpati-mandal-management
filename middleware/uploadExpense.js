const multer = require("multer");
const path = require("path");

// Storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "public/uploads");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowed = /jpg|jpeg|png|pdf/;

    const ext = allowed.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mime = allowed.test(file.mimetype);

    if (ext || mime) {

        cb(null, true);

    } else {

        cb(new Error("Only JPG, PNG and PDF files are allowed."));

    }

};

module.exports = multer({

    storage,

    fileFilter

});