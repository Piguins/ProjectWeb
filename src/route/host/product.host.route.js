const express = require("express");
const Route = express.Router();
const RoomController = require("../../controllers/host/product.host.controllers");
const cloudinary = require("../../config/cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require("multer");
// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./src/public/img/post");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'product',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
var upload = multer({ storage: storage }).array("productImg", 12);


Route.get("/room", RoomController.Index);
Route.get("/room/title", RoomController.DisplayTitle);
Route.post("/room/title", RoomController.SaveTitle);
Route.get("/room/detail", RoomController.DisplayDetail);
Route.post("/room/detail", RoomController.SaveDetail);
Route.get("/room/photos", RoomController.DisplayPhotos);
Route.post("/room/photos", upload, RoomController.SavePhotos);
Route.get("/room/price", RoomController.DisplayPrice);
Route.post("/room/price", RoomController.SaveNewRoom);

module.exports = Route;