const borrowRecords = require("../model/borrowRecords");

exports.totalBooksBorrowed = async (startDate, endDate) => {

    const start = new Date(startDate)
    const end = new Date(endDate)
  const data = await borrowRecords.aggregate([
    {
      $match: {
        borrowedAt: {
          $gte: start,
          $lte: end,
        },
      },
    },
    {
      $count: "totalBorrowedBooks",
    },
  ]);

  return data;
};
