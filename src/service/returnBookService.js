const books = require("../model/books");
const borrowRecords = require("../model/borrowRecords");

exports.addReturnBook = async (bookId, memberId) => {
  const existingBook = await books.findOne({ _id: bookId });
  if (!existingBook) {
    throw new Error("This book is not provided by library");
  }

  const borrowRecord = await borrowRecords.findOne({
    bookId: bookId,
    memberId: memberId,
    returnedAt: null,
  });

  console.log(borrowRecord);
  

  if (!borrowRecord) {
    throw new Error("No active borrow record found for this book");
  }

  const updateBorrowRecord = await borrowRecords.updateOne(
    { _id: borrowRecord._id },
    { $set: { returnedAt: new Date() } }
  );

  console.log(updateBorrowRecord, "cdsfsdfsdfsdf");
  

  existingBook.availableCopies += 1;
  await existingBook.save();

  return {  existingBook, updateBorrowRecord };
};
