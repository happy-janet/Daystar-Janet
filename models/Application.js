// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema({
//     babyName:{
//         type:String,
//         trim:true
//     },
//     gender:{
//         type:String,
//         trim:true
//     },
//     age:{
//         type:Number,
//         trim:true
//     },
//     location:{
//         type:String,
//         trim:true
//     },
//     timeOfArrival:{
//         type:String,
//         trim:true
//     },
//     parentsName:{
//         type:String,
//         trim:true
//     },
//     amount:{
//         type:Number,
//         trim:true
//     },
//     periodOfStay:{
//         type:String,
//         trim:true
//     },
//     babyNumber:{
//         type:String,
//         trim:true
//     },
//     personName:{
//         type:String,
//         trim:true
//     },
//     personContact:{
//         type:String,
//         trim:true
//     },
//     clockInTime:{
//         type:String,
//         trim:true
//     },
//     clockOutTime:{
//         type:String,
//         trim:true
//     },
//     sitter:{
//         type:String,
//         trim:true
//     },
//     checkoutTime: {
//         type: Date,
//         default: null // Default value until the baby is checked out
//     },
//     pickupPerson: {
//         type: String,
//         default: null // Default value until the baby is checked out
//     },
//     contact: {
//         type: String,
//         default: null // Default value until the baby is checked out
//     },
//     status: {
//         type: String,
//         enum: ["CheckedIn", "CheckedOut"], // Add other status options as needed
//         default: "CheckedIn"
//     }
    
// });


// module.exports = mongoose.model("Application", applicationSchema)


const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    babyName: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    timeOfArrival: {
        type: String,
        trim: true
    },
    parentsName: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    periodOfStay: {
        type: String,
        trim: true
    },
    babyNumber: {
        type: String,
        trim: true
    },
    personName: {
        type: String,
        trim: true
    },
    personContact: {
        type: String,
        trim: true
    },
    sitter: {
        type: String,
        trim: true
    },
		sitterId: {
				type: String,
				trim: true
		},
		paid: {
			type: Boolean,
			default: false
		},
    checkoutTime: {
        type: Date,
        default: null // Default value until the baby is checked out
    },
    pickupPerson: {
        type: String,
        default: null // Default value until the baby is checked out
    },
    contact: {
        type: String,
        default: null // Default value until the baby is checked out
    },
    status: {
        type: String,
        enum: ["CheckedIn", "CheckedOut"], // Add other status options as needed
        default: "CheckedIn"
    }
});

module.exports = mongoose.model("Application", applicationSchema);
