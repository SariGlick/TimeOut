import { getAllWebsites } from '../server-side/controllers/websites.controller.js'
import {getUsers} from '../server-side/controllers/user.controller.js'
import {getAllProfiles} from '../server-side/controllers/profile.controller.js'
import {getAllVisitedWebsites} from '../server-side/controllers/visitedWebSite.controller.js'
import {getAllPreference} from '../server-side/controllers/preference.controller.js'

const resolvers = {
  Query: {
    websites: async () => {
      try {
        const allWebSites = await getAllWebsites();
        return allWebSites;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    users: async () => {
      try {
        const allUsers = await getUsers();
        return allUsers;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    profile: async () => {
      try {
        const AllProfiles = await getAllProfiles();
        return AllProfiles;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    visitedWebsites: async () => {
      try {
        const AllVisitedWebsites = await getAllVisitedWebsites();
        return AllVisitedWebsites;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    preferences: async () => {
        try {
          const AllVisitedWebsites = await getAllPreference();
          console.log({AllVisitedWebsites});
          return AllVisitedWebsites;
        } catch (error) {
          throw new Error(error.message);
        }
      },
  },
  // Mutation: {
  //   addBook: (_, { title, author }) => {

  //     let existingAuthor = authors.find(existingAuthor => existingAuthor.name === author);
  //     if (!existingAuthor) {
  //       existingAuthor = { name: author, books: [] };
  //       authors.push(existingAuthor);
  //     }
  //     const newBook = { title, author };
  //     books.push(newBook);

  //     existingAuthor.books.push(title);

  //     return newBook;
  //   },
  //   deleteBook: (_, { title, author }) => {
  //     let existingBook = books.find(existingBook => existingBook.title == title);
  //     console.log({ existingBook });

  //     return { title, author }

  //   },
  //   deleteBook: (_, { title, author }) => {
  //     const index = books.findIndex(book => book.title === title && book.author === author);
  //     console.log({ index });
  //     if (index !== -1) {
  //       const deletedBook = books.splice(index, 1)[0];
  //       // Also remove the book title from the author's array
  //       const author = authors.find(author => author.name === deletedBook.author);
  //       if (author) {
  //         author.books = author.books.filter(bookTitle => bookTitle !== deletedBook.title);
  //       }
  //       return deletedBook;
  //     } else {
  //       return null;
  //     }
  //   },
  // },
  // Book: {
  //   author: (parent) => authors.find(author => author.name === parent.author)
  // }

};

export default resolvers;
