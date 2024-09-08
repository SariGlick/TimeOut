import { ApolloServer } from "apollo-server";
import typeDefs from './schema.js';
import resolvers from './reslovers.js';


const server = new ApolloServer({ typeDefs, resolvers });

server.listen();