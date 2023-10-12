const express = require("express");
const Route = express.Router();
const DashBoard = require("../../controllers/admin/dashboard.admin.controllers");

Route.get("/", DashBoard.index);
Route.get("/roomsrequest", DashBoard.roomsRequest);
Route.get("/contractlist", DashBoard.contractlist);
Route.get("/roomlist", DashBoard.roomlist);
Route.get("/message", DashBoard.message);
Route.post("/roomlist/delete/:id", DashBoard.roomlistDelete);
Route.post("/roomsrequest/add/:id", DashBoard.roomsRequestAcept)

module.exports = Route;