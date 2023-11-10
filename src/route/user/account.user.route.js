const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/acccount.user.controllers");
const cloudinary = require("../../config/cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require("multer");
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'avatar',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  });
  var upload = multer({ storage: storage }).single("productImg");
  

var upload = multer({ storage: storage }).single("productImg");
router.get("/avatar", userController.setavatar);
router.get("/trip", userController.getTrip);
router.get("/hosting", userController.getHosting);
router.get("/hosting/calendar", userController.getHostingCalendar);
router.post("/getpassword", userController.sendPassword);
router.get("/getpassword",userController.getPassword);
router.get("/wishlist", userController.getWishlist);
router.post("/avatar", upload, userController.saveAvatar);
router.post("/wishlist/collection", userController.addCollection);
router.post("/wishlist/update/:id", userController.updateWishlist);
router.get("/porpolio", userController.displayUserPorpolio);
router.get("/validemail/:id", userController.validEmail);
router.post("/validemail/:id",userController.send, userController.validateEmail);
router.get("/activateAccount/:id", userController.activateAccount);
router.get("/message/:id", userController.getMessage);
router.get("/cc",userController.send);

router.get("/calendar",userController.getHostingCalendar);
router.get("/calendar/:id",userController.getSpecificHostingCalendar);
router.get("/message", userController.postMessage);
router.get("/personaldetail/:id",userController.getPersonaldetail);
router.post("/personaldetail/:id",userController.getPersonaldetailUpdate);
router.post("/personaldetail/name",userController.updatePersonalName); 
router.post("/personaldetail/phone",userController.updatePersonalPhone);
router.post("/personaldetail/address",userController.updatePersonalAddress);
module.exports = router;
