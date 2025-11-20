const books = require("../model/books");
const borrowRecordsService = require("../service/borrowRecordsService");

exports.addBorrowRecords = async (req, res) => {
  const { bookId, title, memberId, name } = req.body;

  //console.log(bookId);

  try {
    const existingBooks = await books.findOne({ _id: bookId });
    //console.log(existingBooks);

    if (!existingBooks) {
      throw new Error("Book not found");
    }

    if (existingBooks.availableCopies < 1) {
      throw new Error("Sorry currently we don't have this book");
    }

    if (existingBooks) {
      //console.log(existingBooks.availableCopies);

      existingBooks.availableCopies = existingBooks.availableCopies - 1;

      await existingBooks.save();
    }

    const borrowRecord = await borrowRecordsService.addBorrowRecords(
      bookId,
      title,
      memberId,
      name
    );

    res.status(201).json({
      message: "Add borrow records successfully",
      record: borrowRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to add borrow records",
      error: error.message,
    });
  }
};
