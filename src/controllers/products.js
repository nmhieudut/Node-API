const Product = require("../model/products");
// Validate function
const validateProduct = require("../utils/validate");

const getEntire = async (req, res) => {
  const page = parseInt(req.query.page - 1 || 0);
  const perPage = parseInt(req.query.count || 12);
  const q = req.query.q || "";
  const products = await Product.find({ name: { $regex: q } })
    .limit(perPage)
    .skip(perPage * page);
  const total = await Product.find({ name: { $regex: q } }).countDocuments();
  const resp = { products, total };
  if (products.length > 0) {
    if (q !== "") {
      return res.status(200).json({ ...resp, hasSearched: true });
    }
    return res.status(200).json({ ...resp, hasSearched: false });
  } else {
    return res.status(200).json({ ...resp, hasSearched: true });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  const result = await Product.find({ _id: id });
  if (result) res.json(result);
  else return res.status(200).send("No matching products found");
};

const createOne = async (req, res) => {
  const { error } = validateProduct(req.body);
  const { name, image, price, starRating } = req.body;
  if (error) return res.status(400).json({ message: error.details[0].message });

  const existed = await Product.find({ name: name });
  if (existed.length > 0) {
    return res.status(400).json({ message: "This product is existed" });
  }

  const product = new Product({
    name,
    image,
    price,
    starRating
  });

  const result = await product.save();
  if (result) {
    return res.json(result);
  }
  return res.status(400).json({ message: "Can not create new one" });
};

const updateOne = async (req, res) => {
  const { error } = validateProduct(req.body);
  const { name, url, price } = req.body;
  if (error) return res.status(400).json({ message: error.details[0].message });

  const existed = await Product.find({ _id: req.params.id });
  if (existed.length === 0) {
    return res.status(200).json({ message: "This product is not existed " });
  }

  const result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        url: url,
        price: price
      }
    }
  );
  if (result) {
    return res.json(result);
  }
  return res.status(400).json({ message: "Can not update this product" });
};

const deleteOne = async (req, res) => {
  const existed = await Product.find({ _id: req.params.id });
  if (existed.length === 0) {
    return res.status(400).json({ message: "This product is not existed " });
  }
  const result = await Product.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 1) {
    return res.json({ message: "Delete product success" });
  }
  return res.json({ messgae: "Can not delete this product" });
};

module.exports = {
  getEntire,
  getById,
  createOne,
  updateOne,
  deleteOne
};
