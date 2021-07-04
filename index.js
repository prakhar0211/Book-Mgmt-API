require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// MicroServices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// Initializing express
const BookHUB = express();

// configurations
BookHUB.use(express.json());

// Establish Database connection
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("Connection Established!!!"));

// Initializing MicroServices
BookHUB.use("/book",Books);
BookHUB.use("/author",Authors);
BookHUB.use("/pub",Publications);

BookHUB.listen(3200, () => console.log("Server is Running"));
