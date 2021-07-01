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
const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;