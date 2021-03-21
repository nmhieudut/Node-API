const express = require("express");
const router = express.Router();
// Mock data
const products = require("../data/mock.js");

// Validate function
const validateProduct = require("../utils/validate");

// Get all products
router.get("/", (req, res) => {
  const name = req.body.name;
  if (name) {
    const found = products.find(product => product.name === name);
    if (found) {
      return res.json(found);
    } else return res.status(404).send("No matching products found");
  }
  res.json(products);
});

// Get a single product
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const result = products.find(product => product.id === parseInt(id));
  if (result) res.json(result);
  else return res.status(404).send("No matching products found");
});

// Create a product
router.post("/", (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const product = {
    id: products.length + 1,
    name: req.body.name
  };
  products.push(product);
  res.json(products);
});

// Edit a product
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const found = products.find(product => product.id === parseInt(id));

  if (!found) return res.status(404).send("No matching products found");

  // Validate
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  found.name = req.body.name;
  res.json(found);
});

// Delete a product
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const found = products.find(product => product.id === parseInt(id));

  if (!found) return res.status(404).send("No matching products found");

  const index = products.indexOf(found);
  products.splice(index, 1);

  res.json(products);
});

module.exports = router;
