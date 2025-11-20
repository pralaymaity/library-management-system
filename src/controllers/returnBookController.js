const books = require("../model/books");
const borrowRecords = require("../model/borrowRecords");

const returnBookService = require("../service/returnBookService");

exports.addReturnBook = async (req, res) => {
  const { bookId, memberId } = req.body;

  try {
    const existingBook = await books.findOne({ _id: bookId });

    if (!existingBook) {
      throw new Error("This book is not provided by library");
    }

    if (existingBook) {
      existingBook.availableCopies = existingBook.availableCopies + 1;
    }

    await returnBookService.addReturnBook(existingBook);

    await borrowRecords.deleteOne({ bookId: bookId, memberId: memberId });

    res.status(201).json({ message: "Return book successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to return book", error: error.message });
  }
};
