
const mongoose = require("mongoose");



const memberSchema = new mongoose.Schema(
    {
        username : String,
        email : String,
        password : String
    },
    {
        timestamps : true
    }
)

const member = mongoose.model("members", memberSchema);


module.exports = member;