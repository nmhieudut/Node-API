const Joi = require("joi");
const express = require("express");
const app = express();

// JSON parser
app.use(express.json());

const PORT = process.env.PORT || 3000;
// Mock data
const products = require("./mock.js");

// Routers
app.get("/", (req, res) => {
  res.json({ id: 1, name: "Tanlee" });
});

app.get("/api/products", (req, res) => {
  res.json({ id: 1, name: "Tanle", category: "Loz to" });
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const result = products.find((product) => product.id === parseInt(id));
  if (result) res.json(result);
  else res.status(404).send("No matching products found");
});

app.post("/api/products", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  console.log(req.body.name, result);

  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message,
    });
    return;
  }
  const product = {
    id: products.length + 1,
    name: req.body.name,
  };
  products.push(product);
  res.json(products);
});

// Main app
app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
