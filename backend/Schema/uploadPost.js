var mongoose = require("mongoose");
var userSchema = mongoose.Schema({

email:{type:String},
title:{type:String},
date:{type:Date},
pic:{type:String},
category:{type:String},
likes:{type:Array},
id:{type:String},
commentArray:{type:Array}
},{ versionKey: false });

module.exports = mongoose.model("collectionpost",userSchema);