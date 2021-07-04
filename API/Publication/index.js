// Prefix: /pub

// Initializing express router
const Router = require("express").Router();

// Database Models
const PublicationModel = require("../../database/publication");

/* 
Route           /pub
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
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

Router.get("/:name", async (req, res) => {
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
Router.get("/is/:isbn", async (req, res) => {
    const getSpecificPublicationByisbn = await PublicationModel.findOne({ books: req.params.isbn });

    // const getSpecificPublicationByisbn = database.publications.filter((publications) =>
    //     publications.books.includes(req.params.isbn));

    if (!getSpecificPublicationByisbn) {
        return res.json({ error: `No publication found for book ${req.params.isbn}` });
    }

    return res.json({ publications: getSpecificPublicationByisbn });
});

/* 
Route           /pub/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", async (req, res) => {
    const { newPublication } = req.body;
    await PublicationModel.create(newPublication);

    // database.publications.push(newPublication);
    return res.json({ message: "publication was added" });
});

/* 
Route           /pub/update
Description     update name with isbn
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/update/:isbn", async (req, res) => {
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

Router.put("/update/book/:isbn", async (req, res) => {
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
Route           /pub/delete
Description     delete an author
Access          PUBLIC
Parameters      pubid
Method          DELETE
*/

Router.delete("/delete/:pubId", async (req, res) => {
    const newPublicationList = await PublicationModel.findOneAndDelete({ id: parseInt(req.params.pubId) });

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

Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {

    // delete book from publication
    const newBooksList = await PublicationModel.findOneAndUpdate({ id: parseInt(req.params.pubId) },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        { new: true });

    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.pubId)) {
    //         const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
    //         publication.books = newBooksList;
    //         return;
    //     }
    // });

    // delete publication from book
    const newPublication = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn },
        { publication: 0 }, { new: true });

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.publication = 0;
    //         return;
    //     }
    // });

    return res.json({ books: newPublication, publications: newBooksList });
});

module.exports = Router;
