const mongoose = require("mongoose");

// creating a book Schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

// create a book model
const BookModel = mongoose.model("Books",BookSchema);
// model is the document model of mongodb which is Books here

module.exports = BookModel;