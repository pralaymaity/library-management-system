const reportService = require("../service/reportService");

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
