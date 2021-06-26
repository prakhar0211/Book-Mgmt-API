const express = require("express");

// database
const database = require("./database/index");

// Initializing express
const prakhar = express();

// configurations
prakhar.use(express.json());

/* 
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/


prakhar.get("/", (req, res) => {
    return res.json({ books: database.books });
});

/* 
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

prakhar.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
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
prakhar.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.books.filter((book) =>
        book.category.includes(req.params.category));

    if (getSpecificBooks.length === 0) {
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
prakhar.get("/a/:author", (req, res) => {
    const getSpecificBookAuthor = database.books.filter((book) =>
        book.authors.includes(parseInt(req.params.author)));

    if (getSpecificBookAuthor.length === 0) {
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
prakhar.get("/author", (req, res) => {
    return res.json({ authors: database.authors });
});

/* 
Route           /author
Description     get specific book based on name
Access          PUBLIC
Parameters      name
Method          GET
*/

prakhar.get("/author/:name", (req, res) => {
    const getSpecificBookByAuthorName = database.authors.filter((book) => book.name === req.params.name);

    if (getSpecificBookByAuthorName.length === 0) {
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
prakhar.get("/author/is/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter((author) =>
        author.books.includes(req.params.isbn));

    if (getSpecificAuthors.length === 0) {
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
prakhar.get("/pub", (req, res) => {
    return res.json({ publications: database.publications });
});

/* 
Route           /pub
Description     get specific book based on publication
Access          PUBLIC
Parameters      name
Method          GET
*/

prakhar.get("/pub/:name", (req, res) => {
    const getSpecificBooksByPublication = database.publications.filter((pubname) =>
        pubname.name === req.params.name);


    if (getSpecificBooksByPublication.length === 0) {
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
prakhar.get("/pub/is/:isbn", (req, res) => {
    const getSpecificPublicationByisbn = database.publications.filter((publications) =>
        publications.books.includes(req.params.isbn));

    if (getSpecificPublicationByisbn.length === 0) {
        return res.json({ error: `No publication found for book ${req.params.isbn}` });
    }

    return res.json({ publications: getSpecificPublicationByisbn });
});


prakhar.listen(3200, () => console.log("Server is Running"));

