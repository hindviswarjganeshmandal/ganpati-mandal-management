const memberModel = require("../models/memberModel");
const newsModel = require("../models/newsModel");
const eventModel = require("../models/eventModel");
const galleryModel = require("../models/galleryModel");
const donationModel = require("../models/donationModel");

exports.homePage = async (req, res) => {
    try {
        const members = await memberModel.getAllMembers();
        const latestNews = await newsModel.getLatestNews(3);
        const events = await eventModel.getAllEvents();
        const gallery = await galleryModel.getAllPhotos();   // ✅ Fixed
        const donationStats = await donationModel.getDonationStats();

        res.render("index", {
            members,
            latestNews,
            events,
            gallery,
            donationStats
        });

    } catch (err) {
        console.error("Home Page Error:", err);

        res.render("index", {
            members: [],
            latestNews: [],
            events: [],
            gallery: [],
            donationStats: {
                total: 0,
                donors: 0
            }
        });
    }
};