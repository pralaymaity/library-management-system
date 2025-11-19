const booksService = require("../service/booksService");
const xlsx = require("xlsx"); // for read excel file

exports.createBooks = async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    await booksService.createBooks(data);

    res.status(200).json({ message: "Book is created" });
  } catch (error) {
    console.log("failed to add books", error);
    res.status(500).json({ message: "failed to add books" });
  }
};

exports.createMultipileBooks = async (req, res) => {
  const filePath = req.file.path;
  //console.log(filePath);

  try {
    const workbook = xlsx.readFile(filePath);
    //console.log(workbook);

    const sheetName = workbook.SheetNames[0];
    //console.log(sheetName);

    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    await booksService.createMultipileBooks(jsonData);

    res.status(201).json({ message: "File is created" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload multipile files",
      error: error.message,
    });
  }
};
