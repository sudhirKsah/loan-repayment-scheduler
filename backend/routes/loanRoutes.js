const express = require("express");
const {
  calculateSchedule,
  exportToCSV,
  exportToPDF,
} = require("../controllers/loanController");

const router = express.Router();

router.post("/calculate", calculateSchedule);
router.post("/export-csv", exportToCSV);
router.post("/export-pdf", exportToPDF);

module.exports = router;