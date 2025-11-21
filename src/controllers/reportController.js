const reportService = require("../service/reportService");

// 1. Total books borrowed in a date range

exports.totalBooksBorrowed = async (req, res) => {
  const { startDate, endDate } = req.query;

  //console.log(startDate);

  try {
    const data = await reportService.totalBooksBorrowed(startDate, endDate);
    //console.log(data);

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

exports.bookBorrowCount = async (req, res) => {
  try {
    const data = await reportService.bookBorrowCount();

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.totalBookBorrowMember = async (req, res) => {
  try {
    const data = await reportService.totalBookBorrowMember();

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.monthlyBorrowBooks = async (req, res) => {
  const { year } = req.query;
  console.log(year);

  try {
    const data = await reportService.monthlyBorrowBooks(year);

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.booksCurrentlyBorrowed = async (req, res) => {
  try {
    const data = await reportService.booksCurrentlyBorrowed();

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
