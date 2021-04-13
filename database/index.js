const mongoose = require("mongoose");
require("dotenv").config();

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

mongoose
  .connect(process.env.DB_URI, connectionParams)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => {
    console.log("Error happened when connect to MongoDB: ", error);
  });
