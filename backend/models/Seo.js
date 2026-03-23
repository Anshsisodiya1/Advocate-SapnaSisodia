const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({

page:{
type:String,
required:true
},

title:{
type:String
},

description:{
type:String
},

keywords:{
type:String
}

});

module.exports = mongoose.model("Seo",seoSchema);