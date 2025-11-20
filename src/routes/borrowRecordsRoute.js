


const express = require("express");
const borrowRecordRoute = express.Router();
const borrowRecordControler = require("../controllers/borrowRecordsController");




borrowRecordRoute.post("/borrow-record",borrowRecordControler.addBorrowRecords);
  
  


module.exports = borrowRecordRoute;