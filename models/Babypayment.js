const mongoose = require("mongoose");

const BabypaymentSchema = new mongoose.Schema({
    babyName:{
        type:String,
        trim:true
    },
    periodOfStay:{
        type:String,
        trim:true
    },
    amountPaid:{
        type:String,
        trim:true
    },

});
module.exports = mongoose.model("Babypayment", BabypaymentSchema)
