const express = require("express");
const app = express();
const DataBaseCon = require("./Config/DatabaseConfig");
const indexRoutes = require("./Routes/index.routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

// !----------------------------------------------------
// TODO : config file
dotenv.config({ path: "./Config/config.env" });

// TODO : DataBase connection function
DataBaseCon();

// for static files
app.use(express.static(path.join(__dirname, "build")));
// TODO : express body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO : using CookieParser
app.use(cookieParser());

// !----------------------------------------------------

// TODO : index routes file is placed here
app.use("/api/v1/", indexRoutes);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//?------------------------------------------
// TODO : for  ERROR Response
//?------------------------------------------
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server is running on port " + process.env.PORT || 8080);
});

module.exports = app;
