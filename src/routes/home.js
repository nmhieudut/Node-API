const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { message: "Hello may cung !" });
});

module.exports = router;
