const Voucher = require("../model/vouchers");

const getEntire = async (req, res) => {
  const vouchers = await Voucher.find();
  const total = await Voucher.find().countDocuments();
  if (vouchers.length > 0) {
    return res.status(200).json({ vouchers, total });
  } else {
    return res.status(200).json({ message: "No matching vouchers" });
  }
};

module.exports = { getEntire };
