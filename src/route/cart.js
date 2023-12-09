const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
router.get("/", cartController.index);
router.post("/add", cartController.addtocart);
router.post("/bought", cartController.bought);
module.exports = router;
