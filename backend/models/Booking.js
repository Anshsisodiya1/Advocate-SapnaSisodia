const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

caseType:{
type:String
},

message:{
type:String
},

preferredDate:{
type:Date
},

status:{
type:String,
default:"Pending"
}

},{timestamps:true});

module.exports = mongoose.model("Booking",bookingSchema);