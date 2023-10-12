const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/acccount.user.controllers");



const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./src/public/img/user");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

var upload = multer({ storage: storage }).single("productImg");
router.get("/setavatar", userController.setavatar);
router.get("/trip", userController.getTrip);
router.get("/hosting", userController.getHosting);
router.post("/getpassword", userController.sendPassword);
router.get("/getpassword",userController.getPassword);
router.get("/wishlist", userController.getWishlist);
router.post("/setavatar", upload, userController.saveAvatar);
router.post("/wishlist/collection", userController.addCollection);
router.post("/wishlist/update/:id", userController.updateWishlist);
router.get("/porpolio", userController.displayUserPorpolio);
router.get("/validemail/:id", userController.validEmail);
router.post("/validemail/:id", userController.validateEmail);
router.get("/message/:id", userController.getMessage);
router.get("/cc",userController.send);
router.get("/message", userController.postMessage);
module.exports = router;
