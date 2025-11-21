const mongoose = require("mongoose");

const borrowRecordsSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
  },

  title: String,

  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "members",
  },
  name: String,

  borrowedAt: {
    type: Date,
    default: Date.now
  },

  returnedAt: {
    type: Date,
    default: null 
  },
});

const borrowRecords = mongoose.model("borrowrecords", borrowRecordsSchema);

module.exports = borrowRecords;
