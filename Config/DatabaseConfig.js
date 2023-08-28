const mongoose = require("mongoose");

// TODO : Database connection
const DataBaseCon = () => {
  mongoose
    .connect(process.env.DBCONNECTION_URI_ONLINE)
    .then(() => {
      console.log("Data Base is Connceted to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = DataBaseCon;
