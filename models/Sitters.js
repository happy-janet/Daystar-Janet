const mongoose = require("mongoose");

const sittersSchema = new mongoose.Schema({
    fullname:{
        type:String,
        trim:true
    },    
    email:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        trim:true
    },
    
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    location:{
        type:String,
        trim:true
    },
    dob:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true
    },
    nextOfKin:{
        type:String,
        trim:true
    },
    nin:{
        type:String,
        trim:true
    },
    recommender:{
        type:String,
        trim:true
    },
    educationLevel:{
        type:String,
        trim:true
    },
    contact:{
        type:String,
        trim:true
    },
    sittersNumber:{
        type:String,
        trim:true
    },
		available:{
				type:Boolean,
				default:false
		},
    username: String,
})

module.exports = mongoose.model("Sitters", sittersSchema)
