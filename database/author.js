const mongoose = require("mongoose");

// creating a author Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// create a author model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;