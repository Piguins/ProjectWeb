const express = require("express");
const Route = express.Router();
const addProductController = require("../controllers/addtype");

Route.get("/", addProductController.index);
Route.post("/", addProductController.add);

module.exports = Route;