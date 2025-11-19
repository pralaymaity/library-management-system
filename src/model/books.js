const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    totalCopies: Number,
    availableCopies: Number,
  },
  {
    timestamps: true,
  }
);

const books = mongoose.model("books", booksSchema)

module.exports = books;
