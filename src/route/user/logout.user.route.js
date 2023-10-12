const express = require("express");
const router = express.Router();
const LogOutController = require("../../controllers/user/logout.user.conatrollers");

router.get("/", LogOutController.index);

module.exports = router;
