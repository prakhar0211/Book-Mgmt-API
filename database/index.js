const books = [
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: 1,
  },
  {
    ISBN: "12345TWO",
    title: "Getting started with C++",
    authors: [1],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "tech", "web dev"],
    publication: 1,
  },
];

const authors = [
  {
    id: 1,
    name: "prakhar",
    books: ["12345ONE"],
  },
  {
    id: 2,
    name: "Manish",
    books: ["12345ONE", "12345TWO"],
  },
];

const publications = [
  {
    id: 1,
    name: "chakra",
    books: ["12345ONE", "12345TWO"],
  },
];

module.exports = { books, authors, publications };
