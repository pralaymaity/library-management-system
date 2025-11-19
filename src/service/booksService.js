const books = require("../model/books");

exports.createBooks = (data) => {
  return books.create(data);
};

exports.createMultipileBooks = (jsonData)=>{

  return books.create(jsonData)

}
