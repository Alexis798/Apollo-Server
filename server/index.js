import { startApolloServer } from './app.js'
import { connectDB } from './db/db.js';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';

connectDB()

startApolloServer(typeDefs, resolvers)
