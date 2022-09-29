var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    imageSource: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Post', PostSchema);