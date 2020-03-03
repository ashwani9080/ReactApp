var mongoose=require('mongoose');
var userCategory=mongoose.Schema({
    categoriesArray:{type:Array},
});
module.exports = mongoose.model("collectionCategory",userCategory);
