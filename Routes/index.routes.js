const express = require("express");
const IndexRoutes = express.Router();
const userRoutes = require("./user.routes");
const todoRoutes = require("./todo.routes");

IndexRoutes.use("/user", userRoutes);
IndexRoutes.use("/todo", todoRoutes);

module.exports = IndexRoutes;
