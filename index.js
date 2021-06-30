const express = require("express");

// database
const database = require("./database/index");

// Initializing express
const BookHUB = express();

// configurations
BookHUB.use(express.json());

/* 
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/


BookHUB.get("/", (req, res) => {
    return res.json({ books: database.books });
});

/* 
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      ISBN
Method          GET
*/

BookHUB.get("/is/:isbn", (req, res) => {
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
BookHUB.get("/c/:category", (req, res) => {
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
BookHUB.get("/a/:author", (req, res) => {
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
BookHUB.get("/author", (req, res) => {
    return res.json({ authors: database.authors });
});

/* 
Route           /author
Description     get specific book based on name
Access          PUBLIC
Parameters      name
Method          GET
*/

BookHUB.get("/author/:name", (req, res) => {
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
BookHUB.get("/author/is/:isbn", (req, res) => {
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
BookHUB.get("/pub", (req, res) => {
    return res.json({ publications: database.publications });
});

/* 
Route           /pub
Description     get specific book based on publication
Access          PUBLIC
Parameters      name
Method          GET
*/

BookHUB.get("/pub/:name", (req, res) => {
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
BookHUB.get("/pub/is/:isbn", (req, res) => {
    const getSpecificPublicationByisbn = database.publications.filter((publications) =>
        publications.books.includes(req.params.isbn));

    if (getSpecificPublicationByisbn.length === 0) {
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
BookHUB.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books, message: "book was added" });
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
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors, message: "author was added" });
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
    database.publications.push(newPublication);
    return res.json({ authors: database.publications, message: "publication was added" });
});



/* 
Route           /books/update
Description     update book title with isbn
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
BookHUB.put("/books/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({ books: database.books })
});

/* 
Route           /books/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
BookHUB.put("/books/author/update/:isbn", (req, res) => {
    // update the book data base
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.authors.push(req.body.newAuthorId);
        }
    });

    // update author database
    database.authors.forEach((author) => {
        if (author.id === req.body.newAuthorId) {
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({ books: database.books, authors: database.authors, message: "new author was added" })
});

/* 
Route           /author/update
Description     update name with id
Access          PUBLIC
Parameters      id
Method          PUT
*/
BookHUB.put("/author/update/:id", (req, res) => {
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.id)) {
            author.name = req.body.authorName;
            return;
        }
    });

    return res.json({ authors: database.authors, message: "Author name updated" })
});

/* 
Route           /pub/update
Description     update name with isbn
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
BookHUB.put("/pub/update/:isbn", (req, res) => {
    database.publications.forEach((publication) => {
        if (publication.books.includes(req.params.isbn)) {
            publication.name = req.body.publicationName;
            return;
        }
    });

    return res.json({
        publications: database.publications,
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

BookHUB.put("/pub/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publications,
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

BookHUB.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);

    database.books = updatedBookDatabase;
    return res.json({ books: database.books, message: "succesfully deleted the book" });
});

/* 
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, authorid
Method          DELETE
*/

BookHUB.delete("/book/delete/author/:isbn/:authorId", (req, res) => {

    // update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId));
            book.authors = newAuthorList;
            return;
        }
    });

    // update the author database
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            const newBookList = author.books.filter((book) => book !== req.params.isbn);
            author.books = newBookList;
            return;
        }
    });
    return res.json({ books: database.books, authors: database.authors, message: "author deleted from the book" });
});

/* 
Route           /author/delete
Description     delete an author
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/

// author from the book

BookHUB.delete("/author/delete/:authorId", (req, res) => {
    const newAuthorList = database.authors.filter((author) => author.id !== parseInt(req.params.authorId));
    database.authors = newAuthorList;
    return res.json({ authors: database.authors });
});

/* 
Route           /pub/delete
Description     delete an author
Access          PUBLIC
Parameters      pubid
Method          DELETE
*/

BookHUB.delete("/pub/delete/:pubId", (req,res) => {
    const newPublicationList = database.publications.filter((publication) => 
    publication.id !== parseInt(req.params.pubId));
    database.publications = newPublicationList;
    return res.json({publications: database.publications});
});

/* 
Route           /pub/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, pubid
Method          DELETE
*/

BookHUB.delete("/pub/delete/book/:isbn/:pubId", (req,res) => {

    // delete book from publication
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.pubId)) {
            const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
            publication.books = newBooksList;
            return;
        }
    });

    // delete publication from book
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = 0;
            return;
        }
    });
    
    return res.json({books: database.books, publications: database.publications});
});

BookHUB.listen(3200, () => console.log("Server is Running"));
