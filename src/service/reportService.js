const borrowRecords = require("../model/borrowRecords");

//1. Total books borrowed in a date range
exports.totalBooksBorrowed = async (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
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

//2. Book borrow count (with book title, author);

exports.bookBorrowCount = async () => {
  const data = await borrowRecords.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "booksField",
      },
    },
    {
      $unwind: {
        path: "$booksField",
      },
    },
    {
      $group: {
        _id: "$bookId",
        totalBooksBorrowed: {
          $sum: 1,
        },
        bookName: {
          $first: "$booksField.title",
        },
        authorName: {
          $first: "$booksField.author",
        },
      },
    },
    {
      $sort: {
        totalBooksBorrowed: -1,
      },
    },
  ]);

  return data;
};

//3. Top 3 members who borrowed most books

exports.totalBookBorrowMember = async () => {
  const data = await borrowRecords.aggregate([
    {
      $lookup: {
        from: "members",
        localField: "memberId",
        foreignField: "_id",
        as: "membersField",
      },
    },
    {
      $unwind: {
        path: "$membersField",
      },
    },
    {
      $group: {
        _id: "$memberId",
        name: {
          $first: "$membersField.username",
        },
        totalBorrowed: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalBorrowed: -1,
      },
    },
    {
      $limit: 3,
    },
  ]);

  return data;
};

//4. Monthly borrow statistics (slightly complex)

exports.monthlyBorrowBooks = async (year) => {
  const data = await borrowRecords.aggregate([
    {
      // Filter only records from that YEAR
      $match: {
        borrowedAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      // Group by month
      $group: {
        _id: {
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: "$borrowedAt",
            },
          },
        },
        borrowed: { $sum: 1 },
        returned: {
          $sum: {
            $cond: [{ $ne: ["$returnedAt", null] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        borrowed: 1,
        returned: 1,
      },
    },
  ]);

  return data;
};

// 5 Books currently borrowed (not returned)

exports.booksCurrentlyBorrowed = async () => {
  const data = await borrowRecords.aggregate([
    {
      $match: {
        returnedAt: { $eq: null },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "booksField",
      },
    },
    {
      $unwind: {
        path: "$booksField",
      },
    },
    {
      $lookup: {
        from: "members",
        localField: "memberId",
        foreignField: "_id",
        as: "memberField",
      },
    },
    {
      $unwind: {
        path: "$memberField",
      },
    },
    {
      $group: {
        _id: "$bookId",
        borrowBooks: {
          $sum: 1,
        },
        bookName: {
          $first: "$booksField.title",
        },
        memberName: {
          $first: "$memberField.username",
        },
        borrowedAt: {
          $first: {
            $dateToString: {
              format: "%Y-%m",
              date: "$borrowedAt",
            },
          },
        },
      },
    },
    {
      $sort: {
        borrowBooks: -1,
      },
    },
  ]);

  return data;
};
