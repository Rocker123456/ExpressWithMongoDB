var mongoose = require('mongoose');

var courseschema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name : String,
    price : Number
});

module.exports = mongoose.model('Course',courseschema);