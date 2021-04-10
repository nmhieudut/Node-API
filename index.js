const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const products = require("./routes/products");
const home = require("./routes/home");
require("./database");
require("dotenv").config();

// Configuration
console.log("App name:" + config.get("name"));
console.log("Mail name:" + config.get("mail.host"));

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
// Logger middleware
app.use(logger);

app.use("/", home);
app.use("/api/products", products);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Development");
}
const PORT = process.env.PORT || 3000;

// Main app
app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
