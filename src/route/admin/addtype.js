const express = require("express");
const Route = express.Router();
const addProductController = require("../../controllers/admin/type.admin.controllers");

Route.get("/", addProductController.index);
Route.post("/", addProductController.add);

module.exports = Route;