// Prefix: /author

// Initializing express router
const Router = require("express").Router();

// Database Models
const AuthorModel = require("../../database/author");

/* 
Route           /authors
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
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

Router.get("/:name", async (req, res) => {
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
Router.get("/is/:isbn", async (req, res) => {
    const getSpecificAuthors = await AuthorModel.find({ books: req.params.isbn })
    // const getSpecificAuthors = database.authors.filter((author) =>
    //     author.books.includes(req.params.isbn));

    if (!getSpecificAuthors) {
        return res.json({ error: `No author found for book ${req.params.isbn}` });
    }

    return res.json({ authors: getSpecificAuthors });
});

/* 
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", async (req, res) => {
    const { newAuthor } = req.body;
    await AuthorModel.create(newAuthor);

    // database.authors.push(newAuthor);
    return res.json({ message: "author was added" });
});

/* 
Route           /author/update
Description     update name with id
Access          PUBLIC
Parameters      id
Method          PUT
*/
Router.put("/update/:id", async (req, res) => {
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
Route           /author/delete
Description     delete an author
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/

// author from the book

Router.delete("/delete/:authorId", async (req, res) => {

    // delete author from authors list
    const newAuthorList = await AuthorModel.findOneAndDelete({
        id: parseInt(req.params.authorId)
    });

    // const newAuthorList = database.authors.filter((author) => author.id !== parseInt(req.params.authorId));
    // database.authors = newAuthorList;

    // delete author from a book✨✨✨✨
    const newAuthors = await BookModel.findOneAndUpdate({ $pull: { authors: (req.params.authorId) } },
        { new: true });


    // database.books.forEach((book) => {
    //     const newAuthors = book.authors.filter((authorlist) =>
    //         authorlist !== parseInt(req.params.authorId));
    //     book.authors = newAuthors;
    //     return;
    // });

    return res.json({ books: newAuthors, authors: newAuthorList });
});

module.exports = Router;
