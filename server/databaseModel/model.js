const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://xavyr:Sagecock02@ds153745.mlab.com:53745/testprep');

// Define Mongoose product schema
const entitySchema = new Schema({
	thing1: String,
	thing2: String
}, {collection: 'entity'});

module.exports = mongoose.model('entity', entitySchema);