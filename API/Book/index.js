// Prefix: /book

// Initializing express router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/book");

/* 
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/


Router.get("/", async (req, res) => {
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

Router.get("/is/:isbn", async (req, res) => {
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
Router.get("/c/:category", async (req, res) => {
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
Router.get("/a/:author", async (req, res) => {
    const getSpecificBookAuthor = await BookModel.findOne({ authors: req.params.author })

    // const getSpecificBookAuthor = database.books.filter((book) =>
    //     book.authors.includes(parseInt(req.params.author)));

    if (!getSpecificBookAuthor) {
        return res.json({ error: `No book found for the author number ${req.params.author}` });
    }

    return res.json({ book: getSpecificBookAuthor });
});

/* 
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", async (req, res) => {
    const { newBook } = req.body;
    await BookModel.create(newBook);
    // database.books.push(newBook);

    return res.json({ message: "book was added" });
});

/* 
Route           /books/update
Description     update book title with isbn
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/update/:isbn", async (req, res) => {
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
Router.put("/author/update/:isbn", async (req, res) => {
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
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

Router.delete("/delete/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete({ ISBN: req.params.isbn });
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

Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {

    // update book database
    const authorDeletedFromBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        {
            $pull:
                { authors: parseInt(req.params.authorId) }
        },
        { new: true });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId));
    //         book.authors = newAuthorList;
    //         return;
    //     }
    // });

    // update the author database
    const bookDeletedFromAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(req.params.authorId) },
        {
            $pull:
                { books: req.params.isbn }
        },
        { new: true });

    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId)) {
    //         const newBookList = author.books.filter((book) => book !== req.params.isbn);
    //         author.books = newBookList;
    //         return;
    //     }
    // });
    return res.json({ books: authorDeletedFromBook, authors: bookDeletedFromAuthor, message: "author deleted from the book" });
});

module.exports = Router;