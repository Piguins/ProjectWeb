const express = require("express");
const Route = express.Router();
const addProductController = require("../controllers/addProduct");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./src/public/img/post");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).array("productImg", 12);
Route.get("/", addProductController.index);
Route.post("/step0", addProductController.add0);
Route.get("/step1", addProductController.index1);
Route.post("/step1", addProductController.add1);
Route.get("/step2", addProductController.index2);
Route.post("/step2", upload, addProductController.add2);
module.exports = Route;