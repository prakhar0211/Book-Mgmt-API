const mongoose = require("mongoose");

// creating a publication Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// create a publication model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;