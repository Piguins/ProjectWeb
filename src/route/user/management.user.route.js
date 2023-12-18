const express = require("express");
const router = express.Router();
const ManaController = require("../../controllers/user/management.user.controllers");

router.get("/", ManaController.index);
router.post("/:id", ManaController.delete);
router.post("/edit/:id", ManaController.edit);
module.exports = router;
