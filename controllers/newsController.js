const newsModel = require("../models/newsModel");

exports.showAdminNews = async (req, res) => {
    const news = await newsModel.getAllNews();

    res.render("admin/news", {
        news
    });
};

exports.addNews = async (req, res) => {

    await newsModel.addNews(
        req.body.title,
        req.body.description
    );

    res.redirect("/admin/news");
};