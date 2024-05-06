const mongoose = require("mongoose");

const othersSchema = new mongoose.Schema({
    expenseType:{
        type:String,
        trim:true
    },
    quantity:{
        type:String,
        trim:true
    },
    amount:{
        type:String,
        trim:true
    },

});
module.exports = mongoose.model("Others", othersSchema)
