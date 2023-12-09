const express = require("express");
const router = express.Router();
const ManaController = require("../controllers/management");
const management = require("../controllers/management");
router.get("/", ManaController.index);
router.post("/:id", ManaController.delete);
router.post("/edit/:id", ManaController.edit);
module.exports = router;
