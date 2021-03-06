const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();
const logger = require("./logger");

// Configuration
console.log("App name:" + config.get("name"));
console.log("Mail name:" + config.get("mail.host"));

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Development");
}

app.use(logger);

const PORT = process.env.PORT || 3001;

// Mock data
const products = require("./mock.js");

// Validate function
const validateProduct = require("./utils/validate");

// Template engine
app.set("view engine", "pug");
app.set("index", "./views");

// Routers
app.get("/", (req, res) => {
  res.render("index", { message: "Hello may cung !" });
});

// Get all products
app.get("/api/products", (req, res) => {
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
app.get("/api/product/:id", (req, res) => {
  const id = req.params.id;
  const result = products.find(product => product.id === parseInt(id));
  if (result) res.json(result);
  else return res.status(404).send("No matching products found");
});

// Create a product
app.post("/api/products", (req, res) => {
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
app.put("/api/product/:id", (req, res) => {
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
app.delete("/api/product/:id", (req, res) => {
  const id = req.params.id;
  const found = products.find(product => product.id === parseInt(id));

  if (!found) return res.status(404).send("No matching products found");

  const index = products.indexOf(found);
  products.splice(index, 1);

  res.json(products);
});

// Main app
app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
