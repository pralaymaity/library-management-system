

const express = require("express");
const reportRouter = express.Router();
const reportController = require("../controllers/reportController")



reportRouter.get("/total-borrow-record", reportController.totalBooksBorrowed);



module.exports = reportRouter;