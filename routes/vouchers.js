const express = require("express");
const voucherController = require("../controllers/vouchers");
const router = express.Router();

// Get all voucher
router.get("/", voucherController.getEntire);

module.exports = router;
