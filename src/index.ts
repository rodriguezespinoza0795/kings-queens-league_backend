import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import path from 'path'
import { PrismaClient } from '@prisma/client'
import pkg from 'body-parser';
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import app from './server'
const { json } = pkg;

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const orm = new PrismaClient()
const port = process.env.PORT || 4000

interface MyContext {
  token?: String;
}

const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export default async function main() {
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
          context: async ({ req }) => ({ orm, user: req.user }),
      }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀  Server ready at http://localhost:4000/graphql`);
}