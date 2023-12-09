const express = require("express");
const router = express.Router();
const LogOutController = require("../controllers/logout");

router.get("/", LogOutController.index);

module.exports = router;
