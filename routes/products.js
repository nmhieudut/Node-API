const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

// Get all products
router.get("/", productController.getEntire);

// Get a single product
router.get("/:id", productController.getById);

// Create a product
router.post("/", productController.createOne);

// Edit a product
router.put("/:id", productController.updateOne);

// Delete a product
router.delete("/:id", productController.deleteOne);

module.exports = router;
