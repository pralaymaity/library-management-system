const express = require("express");
const memberRoute = express.Router();
const memberController = require("../controllers/memberController");

memberRoute.post("/create-member", memberController.createMember);

module.exports = memberRoute;
