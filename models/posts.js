var mongoose = require("mongoose");
var Schema = mongoose.Schema; 
var postScheMa = new Schema({
    id: String,
    title: String,
    content: String,
    tags: String,
    time: String,
    views: Number,
});
exports.post = mongoose.model('posts', postScheMa); 