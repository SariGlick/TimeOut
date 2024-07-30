import { ApolloServer,startStandaloneServer } from "@apollo/server";
import typeDefs from './schema.js';
import resolvers from './reslovers.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
