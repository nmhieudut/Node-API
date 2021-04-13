const mongoose = require("mongoose");

const vouchersSchema = new mongoose.Schema({
  url: String,
  legend: String
});

const Voucher = mongoose.model("Vouchers", vouchersSchema, "voucher_slider");

module.exports = Voucher;
