

const express = require("express");
const booksRouter = express.Router();
const booksController = require("../controllers/booksController")
const upload = require("../middleware/upload");

booksRouter.post("/create-books", booksController.createBooks);
booksRouter.post("/upload/create-books", upload.single("file"), booksController.createMultipileBooks);


module.exports = booksRouter;