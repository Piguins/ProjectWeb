const express = require("express");
const Route = express.Router();
const Home = require("../controllers/home");

Route.get("/", Home.index);
Route.get("/:type", Home.type);
module.exports = Route;