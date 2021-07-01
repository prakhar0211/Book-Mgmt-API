const mongoose = require("mongoose");

// creating a author Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// create a author model
const AuthorModel = mongoose.model("Authors",AuthorSchema);
// model is the document model of mongodb which is Authors here
// if this document does not exist then mongo db will automatically create the document


module.exports = AuthorModel;