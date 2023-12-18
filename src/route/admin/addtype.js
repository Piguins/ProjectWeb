const express = require("express");
const Route = express.Router();
const addProductController = require("../../controllers/admin/type.admin.controllers");
const cloudinary =require("../../config/cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require("multer");
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
   folder:'type',
   allowedFormats:['jpg','png','jpeg'],
   transformation:[{width:500,height:500,crop:'limit'}],
  });
  var upload = multer({ storage: storage }).single("singleImg")
  


Route.get("/", addProductController.index);
Route.post("/",upload, addProductController.add);

module.exports = Route;