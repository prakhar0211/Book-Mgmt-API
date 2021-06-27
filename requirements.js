// Requirements

// We are a company that handles book publications

// Book
// ISBN, Title, Author [], Language, Pub Date, Num Page, Category[]

// Authors
                // Name, Id, Books[]

// Publications          
// Name, Id, Books[]

// Requirements

// ----------------------------------------------------------------------------------------

// Books

// We need an API
// GET
// to get all books                                             ✔      /
// to get specific book                                         ✔      /is/:isbn
// to get a list of books based on category                     ✔      /c/:category
// to get a list of books based on author                       ✔      /a/:authornumber

// POST
// New Book                                                     ✔      /book/new

// PUT
// update book details                                    ✔      /books/update/:isbn
// update/add new author                                  ✔      /books/author/update/:isbn

// delete
// delete a book 
// delete a author from a book


// ----------------------------------------------------------------------------------------

// Author

// We need an API 

// GET
// to get all authors                                           ✔      /author
// to get specific author                                       ✔      /author/:name
// to get a list of authors based on a book ISBN.               ✔      /author/is/:isbn

// POST
// NEW AUTHOR                                                   ✔      /author/new

// PUT
// AuTHOR details                                               ✔      /author/update/:id

// DELETE
// delete an author

// ----------------------------------------------------------------------------------------


// Publication

// We need an API

// GET
// to get all publications                                      ✔      /pub
// to get specific publication                                  ✔      /pub/:name
// to get a list of publications based on a book.               ✔      /pub/is/:isbn

// POST
// ADD NEW PUB  LICATION                                        ✔      /pub/new

// PUT
// updsate publication details                                  ✔      /pub/update/:isbn
// update/add new book to the publication

// DELETE
// delete a book from publication
// delete a publication