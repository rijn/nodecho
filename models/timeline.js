var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var timelineScheMa = new Schema({
    id: Number,
    time: String,
    title: String,
    detail: Array,
}, {
    collection: 'timeline',
});
exports.timeline = mongoose.model('timeline', timelineScheMa);
