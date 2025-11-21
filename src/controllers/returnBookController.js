

const returnBookService = require("../service/returnBookService");

exports.addReturnBook = async (req, res) => {
  const { bookId, memberId } = req.body;

  try {
    await returnBookService.addReturnBook(bookId, memberId);
    
    res.status(200).json({ message: "Return book successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to return book", error: error.message });
  }
};
