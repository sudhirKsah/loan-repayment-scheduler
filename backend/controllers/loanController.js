const { generateSchedule } = require("../utils/calculations");
const { Parser } = require("json2csv");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const calculateSchedule = (req, res) => {
  const { disbursementDate, principal, tenure, frequency, interestRate, moratoriumPeriod } = req.body;

  try {
    const schedule = generateSchedule(disbursementDate, principal, tenure, frequency, interestRate, moratoriumPeriod);
    res.status(200).json({ schedule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const exportToCSV = (req, res) => {
    const { schedule, summary } = req.body;
  
    try {
      const parser = new Parser();
      const csv = parser.parse(schedule);
  
      const summaryRow = [
        "Summary",
        "",
        "",
        "",
        `Total Interest Paid: ${summary.totalInterest.toFixed(2)}`,
        `Total Amount Paid: ${summary.totalAmount.toFixed(2)}`,
        "",
      ].join(",");
  
      const csvWithSummary = `${csv}\n${summaryRow}`;
  
      res.header("Content-Type", "text/csv");
      res.attachment("loan_schedule.csv");
      res.send(csvWithSummary);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const exportToPDF = async (req, res) => {
    const { schedule, summary } = req.body;
  
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
      let y = height - 50;
  
      page.drawText("Loan Repayment Schedule Summary", { x: 50, y, size: 18, font, color: rgb(0, 0, 0) });
      y -= 30;
      page.drawText(`Total Interest Paid: ${summary.totalInterest.toFixed(2)}`, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });
      y -= 20;
      page.drawText(`Total Amount Paid: ${summary.totalAmount.toFixed(2)}`, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });
      y -= 40;
  
      page.drawText("Payment Schedule", { x: 50, y, size: 16, font, color: rgb(0, 0, 0) });
      y -= 30;
  
      const headers = ["No.", "Date", "Opening Balance", "EMI", "Interest", "Principal", "Closing Balance"];
      const columnWidths = [40, 80, 100, 60, 60, 80, 100];
      let x = 50;
  
      headers.forEach((header, index) => {
        page.drawText(header, { x: x, y, size: 12, font, color: rgb(0, 0, 0) });
        x += columnWidths[index];
      });
      y -= 20;
  
      schedule.forEach((row) => {
        x = 50;
        const values = [
          row.paymentNumber.toString(),
          row.date,
          `${parseFloat(row.openingBalance).toFixed(2)}`,
          `${parseFloat(row.emi).toFixed(2)}`,
          `${parseFloat(row.interest).toFixed(2)}`,
          `${parseFloat(row.principal).toFixed(2)}`,
          `${parseFloat(row.closingBalance).toFixed(2)}`,
        ];
  
        values.forEach((value, index) => {
          page.drawText(value, { x: x, y, size: 10, font, color: rgb(0, 0, 0) });
          x += columnWidths[index];
        });
        y -= 20;
  
        if (y < 50) {
          page.drawText("Continued...", { x: 50, y, size: 10, font, color: rgb(0, 0, 0) });
          y = height - 50;
          pdfDoc.addPage();
        }
      });
  
      const pdfBytes = await pdfDoc.save();
      res.header("Content-Type", "application/pdf");
      res.attachment("loan_schedule.pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { calculateSchedule, exportToCSV, exportToPDF };