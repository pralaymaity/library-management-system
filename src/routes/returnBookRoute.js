


const express = require("express");
const returnBookRoute = express.Router();
const returnBookController = require("../controllers/returnBookController");


returnBookRoute.post("/return-book", returnBookController.addReturnBook);


module.exports = returnBookRoute;
