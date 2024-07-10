import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const typeDefs = `
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}

type Query {
    books: [Book]
    authors: [Author]
  }

  type Mutation {
  addBook(title: String, author: String): Book
}
`;

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