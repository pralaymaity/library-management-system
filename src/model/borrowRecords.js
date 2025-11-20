const mongoose = require("mongoose");

const borrowRecordsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: "borrowedAt",
      updatedAt: "returnedAt",
    },
  }
);

const borrowRecords = mongoose.model("borrowrecords", borrowRecordsSchema);

module.exports = borrowRecords;
