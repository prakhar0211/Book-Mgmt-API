require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// database
const database = require("./database/index");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

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

/* 
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/


BookHUB.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ books: getAllBooks });
});

/* 
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

BookHUB.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    // const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    // if mongodb does not find any data it returns null

    if (!getSpecificBook) {     //because getSpecificBook is null or false this will change it to true
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` });
    }

    return res.json({ book: getSpecificBook });
});

/* 
Route           /c/
Description     get specific book based on category
Access          PUBLIC
Parameters      category
Method          GET
*/
BookHUB.get("/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.findOne({ category: req.params.category });

    // const getSpecificBooks = database.books.filter((book) =>
    //     book.category.includes(req.params.category));

    if (!getSpecificBooks) {
        return res.json({ error: `No book found for the category of ${req.params.category}` });
    }

    return res.json({ book: getSpecificBooks });
});

/* 
Route           /a/
Description     get specific book based on author
Access          PUBLIC
Parameters      author
Method          GET
*/
BookHUB.get("/a/:author", async (req, res) => {
    const getSpecificBookAuthor = await BookModel.findOne({ authors: req.params.author })

    // const getSpecificBookAuthor = database.books.filter((book) =>
    //     book.authors.includes(parseInt(req.params.author)));

    if (!getSpecificBookAuthor) {
        return res.json({ error: `No book found for the author number ${req.params.author}` });
    }

    return res.json({ book: getSpecificBookAuthor });
});

/* 
Route           /authors
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
BookHUB.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

/* 
Route           /author
Description     get specific book based on name
Access          PUBLIC
Parameters      name
Method          GET
*/

BookHUB.get("/author/:name", async (req, res) => {
    const getSpecificBookByAuthorName = await AuthorModel.findOne({ name: req.params.name });

    // const getSpecificBookByAuthorName = database.authors.filter((book) => 
    // book.name === req.params.name);

    if (!getSpecificBookByAuthorName) {
        return res.json({ error: `No book found for the name of ${req.params.name}` });
    }

    return res.json({ book: getSpecificBookByAuthorName });
});

/* 
Route           /author/is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
BookHUB.get("/author/is/:isbn", async (req, res) => {
    const getSpecificAuthors = await AuthorModel.find({ books: req.params.isbn })
    // const getSpecificAuthors = database.authors.filter((author) =>
    //     author.books.includes(req.params.isbn));

    if (!getSpecificAuthors) {
        return res.json({ error: `No author found for book ${req.params.isbn}` });
    }

    return res.json({ authors: getSpecificAuthors });
});

/* 
Route           /pub
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
BookHUB.get("/pub", async (req, res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json({ publications: getAllPublication });
});

/* 
Route           /pub
Description     get specific book based on publication
Access          PUBLIC
Parameters      name
Method          GET
*/

BookHUB.get("/pub/:name", async (req, res) => {
    const getSpecificBooksByPublication = await PublicationModel.find({ name: req.params.name });

    // const getSpecificBooksByPublication = database.publications.filter((pubname) =>
    //     pubname.name === req.params.name);


    if (!getSpecificBooksByPublication) {
        return res.json({ error: `No books found for the publication ${req.params.name}` });

    }
    return res.json({ publications: getSpecificBooksByPublication });

});


/* 
Route           /pub/is
Description     get specific publication book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
BookHUB.get("/pub/is/:isbn", async (req, res) => {
    const getSpecificPublicationByisbn = await PublicationModel.findOne({ books: req.params.isbn });

    // const getSpecificPublicationByisbn = database.publications.filter((publications) =>
    //     publications.books.includes(req.params.isbn));

    if (!getSpecificPublicationByisbn) {
        return res.json({ error: `No publication found for book ${req.params.isbn}` });
    }

    return res.json({ publications: getSpecificPublicationByisbn });
});

/* 
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
BookHUB.post("/book/new", async (req, res) => {
    const { newBook } = req.body;
    BookModel.create(newBook);
    // database.books.push(newBook);

    return res.json({ message: "book was added" });
});

/* 
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
BookHUB.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);

    // database.authors.push(newAuthor);
    return res.json({ message: "author was added" });
});

/* 
Route           /pub/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
BookHUB.post("/pub/new", (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);

    // database.publications.push(newPublication);
    return res.json({ message: "publication was added" });
});



/* 
Route           /books/update
Description     update book title with isbn
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
BookHUB.put("/books/update/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn },
        { title: req.body.bookTitle }
        , { new: true }       //to view the updated data in postman
    );

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.title  = req.body.bookTitle;
    //         return;
    //     }
    // });

    return res.json({ books: updatedBook })
});

/* 
Route           /books/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
BookHUB.put("/books/author/update/:isbn", async (req, res) => {
    // update the book data base
    const updatedBook = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn },
        {
            $addToSet: {
                authors: req.body.newAuthorId
            }
        },
        { new: true });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return book.authors.push(req.body.newAuthorId);
    //     }
    // });

    // update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({ id: req.body.newAuthorId },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        { new: true });


    // database.authors.forEach((author) => {
    //     if (author.id === req.body.newAuthorId) {
    //         return author.books.push(req.params.isbn);
    //     }
    // });
    return res.json({ books: updatedBook, authors: updatedAuthor, message: "new author was added" })
});

/* 
Route           /author/update
Description     update name with id
Access          PUBLIC
Parameters      id
Method          PUT
*/
BookHUB.put("/author/update/:id", async (req, res) => {
    const updatedAuthorName = await AuthorModel.findOneAndUpdate({ id: req.params.id },
        { name: req.body.authorName },
        { new: true });

    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.id)) {
    //         author.name = req.body.authorName;
    //         return;
    //     }
    // });

    return res.json({ authors: updatedAuthorName, message: "Author name updated" })
});

/* 
Route           /pub/update
Description     update name with isbn
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
BookHUB.put("/pub/update/:isbn", async (req, res) => {
    const updatePublicationName = await PublicationModel.findOneAndUpdate(
        { books: req.params.isbn },
        { name: req.body.publicationName },
        { new: true });

    // database.publications.forEach((publication) => {
    //     if (publication.books.includes(req.params.isbn)) {
    //         publication.name = req.body.publicationName;
    //         return;
    //     }
    // });

    return res.json({
        publications: updatePublicationName,
        message: "publication name updated"
    })
});

/* 
Route           /pub/update/book
Description     update/add new book to the publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

BookHUB.put("/pub/update/book/:isbn", async (req, res) => {
    // update the publication database
    const updatedBooksInPublication = await PublicationModel.findOneAndUpdate(
        { id: req.body.pubId },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        { new: true });

    // database.publications.forEach((publication) => {
    //     if (publication.id === req.body.pubId) {
    //         return publication.books.push(req.params.isbn);
    //     }
    // });

    // update the book database
    const updatedpublicattionInBooks = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        { publication: req.body.pubId },
        { new: true }
    );
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publication = req.body.pubId;
    //         return;
    //     }
    // });

    return res.json({
        books: updatedpublicattionInBooks,
        publications: updatedBooksInPublication,
        message: "Successfully updated publication",
    });
});

/* 
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

BookHUB.delete("/book/delete/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});
    // const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);

    // database.books = updatedBookDatabase;
    return res.json({ books: updatedBookDatabase, message: "succesfully deleted the book" });
});

/* 
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, authorid
Method          DELETE
*/

BookHUB.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {

    // update book database
    const authorDeletedFromBook = await BookModel.findOneAndUpdate(
        {ISBN : req.params.isbn},
        {$pull:
            {authors:parseInt(req.params.authorId)}},
    {new: true});
    
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId));
    //         book.authors = newAuthorList;
    //         return;
    //     }
    // });

    // update the author database
    const bookDeletedFromAuthor = await AuthorModel.findOneAndUpdate(
        {id:parseInt(req.params.authorId)},
        {$pull:
        {books: req.params.isbn}},
    {new:true});

    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId)) {
    //         const newBookList = author.books.filter((book) => book !== req.params.isbn);
    //         author.books = newBookList;
    //         return;
    //     }
    // });
    return res.json({ books: authorDeletedFromBook, authors: bookDeletedFromAuthor, message: "author deleted from the book" });
});

/* 
Route           /author/delete
Description     delete an author
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/

// author from the book

BookHUB.delete("/author/delete/:authorId", async (req, res) => {

    // delete author from authors list
    const newAuthorList = await AuthorModel.findOneAndDelete({
        id: parseInt(req.params.authorId)
    });

    // const newAuthorList = database.authors.filter((author) => author.id !== parseInt(req.params.authorId));
    // database.authors = newAuthorList;

    // delete author from a book✨✨✨✨
    const newAuthors = await BookModel.findOneAndUpdate({$pull:{authors:(req.params.authorId)}},
    {new:true});


    // database.books.forEach((book) => {
    //     const newAuthors = book.authors.filter((authorlist) =>
    //         authorlist !== parseInt(req.params.authorId));
    //     book.authors = newAuthors;
    //     return;
    // });

    return res.json({ books: newAuthors, authors: newAuthorList });
});

/* 
Route           /pub/delete
Description     delete an author
Access          PUBLIC
Parameters      pubid
Method          DELETE
*/

BookHUB.delete("/pub/delete/:pubId", async (req, res) => {
    const newPublicationList = await PublicationModel.findOneAndDelete({id:parseInt(req.params.pubId)});

    // const newPublicationList = database.publications.filter((publication) =>
    //     publication.id !== parseInt(req.params.pubId));
    // database.publications = newPublicationList;
    return res.json({ publications: newPublicationList });
});

/* 
Route           /pub/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, pubid
Method          DELETE
*/

BookHUB.delete("/pub/delete/book/:isbn/:pubId", async (req, res) => {

    // delete book from publication
    const newBooksList = await PublicationModel.findOneAndUpdate({id:parseInt(req.params.pubId)},
    {$pull:{
        books: req.params.isbn
    }
},
    {new:true});

    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.pubId)) {
    //         const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
    //         publication.books = newBooksList;
    //         return;
    //     }
    // });

    // delete publication from book
    const newPublication = await BookModel.findOneAndUpdate({ISBN:req.params.isbn},
        {publication: 0},{new:true});

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publication = 0;
    //         return;
    //     }
    // });

    return res.json({ books: newPublication, publications: newBooksList });
});

BookHUB.listen(3200, () => console.log("Server is Running"));
