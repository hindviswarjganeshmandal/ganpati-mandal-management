const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

const incomeModel = require("../models/incomeModel");
const expenseModel = require("../models/expenseModel");

// =====================
// Export Excel
// =====================

exports.exportExcel = async (req, res) => {

    const year = req.query.year || new Date().getFullYear();

    const income = await incomeModel.getAllIncome(year);
    const expense = await expenseModel.getAllExpenses(year);

    const workbook = new ExcelJS.Workbook();

    // Income Sheet
    const incomeSheet = workbook.addWorksheet("Income");

    incomeSheet.columns = [
        { header: "Date", key: "date", width: 18 },
        { header: "Source", key: "source", width: 30 },
        { header: "Amount", key: "amount", width: 15 },
        { header: "Payment", key: "payment_method", width: 20 }
    ];

    income.forEach(row => incomeSheet.addRow(row));

    // Expense Sheet
    const expenseSheet = workbook.addWorksheet("Expense");

    expenseSheet.columns = [
        { header: "Date", key: "expense_date", width: 18 },
        { header: "Category", key: "category", width: 25 },
        { header: "Item", key: "item_name", width: 25 },
        { header: "Total", key: "total", width: 15 }
    ];

    expense.forEach(row => expenseSheet.addRow(row));

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=Finance_Report_${year}.xlsx`
    );

    await workbook.xlsx.write(res);

    res.end();

};

// =====================
// Export PDF
// =====================

exports.exportPDF = async (req, res) => {

    const year = req.query.year || new Date().getFullYear();

    const totalIncome = await incomeModel.getYearIncome(year);
    const totalExpense = await expenseModel.getYearExpense(year);

    const balance = totalIncome - totalExpense;

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=Finance_Report_${year}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text("Finance Report", {
        align: "center"
    });

    doc.moveDown();

    doc.fontSize(14);

    doc.text(`Year : ${year}`);

    doc.moveDown();

    doc.text(`Total Income : ₹ ${totalIncome}`);

    doc.text(`Total Expense : ₹ ${totalExpense}`);

    doc.text(`Current Balance : ₹ ${balance}`);

    doc.end();

};