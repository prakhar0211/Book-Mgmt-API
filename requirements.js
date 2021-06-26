// Requirements

// We are a company that handles book publications

// Book
// ISBN, Title, Author [], Language, Pub Date, Num Page, Category[]

// Authors
                // Name, Id, Books[]

// Publications 
// Name, Id, Books[]

// Requirements

// Books

// We need an API
// to get all books                                             ✔      /
// to get specific book                                         ✔      /is/:isbn
// to get a list of books based on category                     ✔      /c/:category
// to get a list of books based on author                       ✔      /a/:authornumber

// Author

// We need an API                                               
// to get all authors                                           ✔      /author
// to get specific author                                       ✔      /author/:name
// to get a list of authors based on a book ISBN.               ✔      /author/is/:isbn

// Publication

// We need an API
// to get all publications                                      ✔      /pub
// to get specific publication                                  ✔      /pub/:name
// to get a list of publications based on a book.               ✔      /pub/is/:isbn
