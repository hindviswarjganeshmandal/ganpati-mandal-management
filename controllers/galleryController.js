const galleryModel = require("../models/galleryModel");
const fs = require("fs");
const path = require("path");

// ===========================
// Show Gallery Page (Website)
// ===========================
exports.showGallery = async (req, res) => {

    try {

        const photos = await galleryModel.getAllPhotos();

        res.render("gallery", {
            photos
        });

    } catch (err) {

        console.log(err);

        res.render("gallery", {
            photos: []
        });

    }

};

// ===========================
// Admin Gallery Page
// ===========================
exports.showAdminGallery = async (req, res) => {
    try {
        const photos = await galleryModel.getAllPhotos();

        res.render("admin/gallery", {
            photos
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

// ===========================
// Upload Photo
// ===========================



exports.uploadPhoto = async (req, res) => {

    try {

        const { title } = req.body;

        if (!req.file) {
            return res.send("Please select an image");
        }

        const image = req.file.filename;

        await galleryModel.addPhoto(title, image);

        req.session.success = "Photo uploaded successfully";

        res.redirect("/admin/gallery");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

};

// ===========================
// Delete Photo
// ===========================


exports.deletePhoto = async (req, res) => {

    try {

        const id = req.params.id;

        // Get photo information from database
        const photo = await galleryModel.getPhotoById(id);

        if (!photo) {
            return res.redirect("/admin/gallery");
        }

        // Actual image location
        const imagePath = path.join(
            __dirname,
            "../public/uploads/gallery",
            photo.image
        );

        // Delete actual image file
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete database record
        await galleryModel.deletePhoto(id);
        req.flash("success", "Photo deleted successfully!");
        // Back to gallery
        res.redirect("/admin/gallery");

    } catch (err) {

        console.log("Delete Gallery Error:", err);

        res.status(500).send(err.message);

    }
};