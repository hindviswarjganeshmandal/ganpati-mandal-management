const multer = require("multer");
const path = require("path");

 storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "public/uploads/payment");
    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});

module.exports = multer({ storage });