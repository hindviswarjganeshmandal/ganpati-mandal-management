const ExcelJS = require("exceljs");

const memberModel = require("../models/memberModel");
const donationModel = require("../models/donationModel");
const eventModel = require("../models/eventModel");

// ================= Export Members =================

exports.exportMembers = async (req, res) => {

    try {

        const members = await memberModel.getAllMembers();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Members");

        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Full Name", key: "fullname", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 20 },
            { header: "Address", key: "address", width: 40 }
        ];

        members.forEach(member => {
            worksheet.addRow(member);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Members.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// ================= Export Donations =================

exports.exportDonations = async (req, res) => {

    try {

        const donations = await donationModel.getAllDonations();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Donations");

        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Full Name", key: "fullname", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Status", key: "status", width: 20 }
        ];

        donations.forEach(donation => {
            worksheet.addRow(donation);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Donations.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};

// ================= Export Events =================

exports.exportEvents = async (req, res) => {

    try {

        const events = await eventModel.getAllEvents();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Events");

        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Title", key: "title", width: 30 },
            { header: "Date", key: "event_date", width: 20 },
            { header: "Time", key: "event_time", width: 20 },
            { header: "Location", key: "location", width: 30 },
            { header: "Description", key: "description", width: 50 }
        ];

        events.forEach(event => {
            worksheet.addRow(event);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=Events.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};
const newsModel = require("../models/newsModel");

exports.exportNews = async (req, res) => {

    try {

        const news = await newsModel.getAllNews();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("News");

        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Title", key: "title", width: 40 },
            { header: "Description", key: "description", width: 70 },
            { header: "Date", key: "created_at", width: 25 }
        ];

        news.forEach(item => {
            worksheet.addRow(item);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=News.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

};