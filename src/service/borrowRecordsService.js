

const borrowRecords = require("../model/borrowRecords")


exports.addBorrowRecords = (bookId, title, memberId, name)=>{

    return borrowRecords.create(
        {
            bookId,
            title,
            memberId,
            name
        }
    )

}