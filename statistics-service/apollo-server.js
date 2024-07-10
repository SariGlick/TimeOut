import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    books: [Book]
    authors: [Author]
  }

  type Mutation {
  addBook(title: String, author: String): Book
}
`;

const books = [
    {
        title: 'grammer',
        author: "dvory"

    },
    {
        title: "math",
        author: "michal"
    }
]

const authors = [
    {
        name: "dvory",
        books: "grammer"
    },
    {
        name: "michal",
        books: "math"
    }
]
const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
    },
    Mutation: {
        addBook: (_, { title, author }) => {

            let existingAuthor = authors.find(existingAuthor => existingAuthor.name === author);
            if (!existingAuthor) {
                existingAuthor = { name: author, books: [] };
                authors.push(existingAuthor);
            }
            const newBook = { title, author };
            books.push(newBook);

            existingAuthor.books.push(title);

            return newBook;
        },
    },
    Book: {
        author: (parent) => authors.find(author => author.name === parent.author)
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);