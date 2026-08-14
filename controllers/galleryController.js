const galleryModel = require("../models/galleryModel");
const cloudinary = require("../config/cloudinary");
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

        await galleryModel.addPhoto(
            req.body.title,
            req.file.path,          // Cloudinary URL
            req.file.filename       // Public ID
        );

        req.flash("success", "Photo uploaded successfully");
        res.redirect("/admin/gallery");

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
};

// ===========================
// Delete Photo
// ===========================


exports.deletePhoto = async (req, res) => {

    try {

        const photo = await galleryModel.getPhotoById(req.params.id);

        if (photo) {

            await cloudinary.uploader.destroy(photo.public_id);

            await galleryModel.deletePhoto(req.params.id);

        }

        req.flash("success", "Photo deleted successfully");
        res.redirect("/admin/gallery");

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};