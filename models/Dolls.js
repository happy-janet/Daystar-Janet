const mongoose = require("mongoose");

const dollsSchema = new mongoose.Schema({
    dollName:{
        type:String,
        trim:true
    },
    dollPrice:{
        type:String,
        trim:true
    },

});
module.exports = mongoose.model("Dolls", dollsSchema)
