const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  starRating: Number
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
