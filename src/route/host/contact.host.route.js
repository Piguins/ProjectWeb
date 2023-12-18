const express = require("express");
const Route = express.Router();


const ContactController = require("../../controllers/host/contact.host.controllers");


Route.post("/mes",ContactController.sendMessage);

module.exports = Route;