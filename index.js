const Joi = require("joi");
const express = require("express");
const app = express();

// JSON parser
app.use(express.json());

const PORT = process.env.PORT || 3000;
// Mock data
const products = require("./mock.js");

// Utils
const validateProduct = require("./Utils/validate");

// Routers
app.get("/", (req, res) => {
  res.json({ id: 1, name: "Tanlee" });
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//Get a single product
app.get("/api/product/:id", (req, res) => {
  const id = req.params.id;
  const result = products.find((product) => product.id === parseInt(id));
  if (result) res.json(result);
  else return res.status(404).send("No matching products found");
});

// Create a product
app.post("/api/products", (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const product = {
    id: products.length + 1,
    name: req.body.name,
  };
  products.push(product);
  res.json(products);
});

// Edit a product
app.put("/api/product/:id", (req, res) => {
  const id = req.params.id;
  const found = products.find((product) => product.id === parseInt(id));

  if (!found) return res.status(404).send("No matching products found");

  // Validate
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  found.name = req.body.name;
  res.json(found);
});

// Delete a product
app.delete("/api/product/:id", (req, res) => {
  const id = req.params.id;
  const found = products.find((product) => product.id === parseInt(id));

  if (!found) return res.status(404).send("No matching products found");

  const index = products.indexOf(found);
  products.splice(index, 1);

  res.json(products);
});

// Main app
app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
