const galleryModel = require("../models/galleryModel");

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

        res.send(err.message);

    }

};

// ===========================
// Upload Photo
// ===========================
exports.uploadPhoto = async (req, res) => {

    try {

        await galleryModel.addPhoto({
            title: req.body.title,
            image: req.file.filename
        });

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

        await galleryModel.deletePhoto(req.params.id);

        res.redirect("/admin/gallery");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }

};