const express = require("express");
const Route = express.Router();
const ProductController = require("../../controllers/user/product.user.controllers")


Route.get("/:id", ProductController.specific);
Route.post("/payment", ProductController.payment);
Route.get("/payment/success", ProductController.success);
module.exports = Route;
