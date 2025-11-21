

const express = require("express");
const reportRouter = express.Router();
const reportController = require("../controllers/reportController");

reportRouter.get("/total-borrow-range", reportController.totalBooksBorrowed);
reportRouter.get("/book-borrow-count", reportController.bookBorrowCount);
reportRouter.get("/top-members", reportController.totalBookBorrowMember);
reportRouter.get("/monthly-stats", reportController.monthlyBorrowBooks);
reportRouter.get("/currently-borrowed", reportController.booksCurrentlyBorrowed);

module.exports = reportRouter;
