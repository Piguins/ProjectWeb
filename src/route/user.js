const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");



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
router.get("/wishlist", userController.getWishlist);
router.post("/setavatar", upload, userController.saveAvatar);
router.post("/wishlist/collection", userController.addCollection);
router.post("/wishlist/update/:id", userController.updateWishlist);
module.exports = router;
