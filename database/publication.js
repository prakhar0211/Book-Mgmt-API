const mongoose = require("mongoose");

// creating a publication Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

// create a publication model
const PublicationModel = mongoose.model("Publications",PublicationSchema);
// model is the document model of mongodb which is Publications here
// if this document does not exist then mongo db will automatically create the document

module.exports = PublicationModel;