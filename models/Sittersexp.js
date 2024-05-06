const mongoose = require("mongoose");

const sitersexpSchema = new mongoose.Schema({
    sitterName:{
        type:String,
        trim:true
    },
    numBabies:{
        type:String,
        trim:true
    },
    amount:{
        type:String,
        trim:true
    },

});
module.exports = mongoose.model("Sittersexp", sitersexpSchema)
