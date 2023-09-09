"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = require("fs");
const resolvers_1 = __importDefault(require("./resolvers"));
const server_2 = __importDefault(require("./server"));
const { json } = body_parser_1.default;
const typeDefs = (0, fs_1.readFileSync)(path_1.default.join(__dirname, 'schema.graphql'), 'utf8');
const orm = new client_1.PrismaClient();
const port = process.env.PORT || 4000;
const httpServer = http_1.default.createServer(server_2.default);
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
async function main() {
    await server.start();
    server_2.default.use('/graphql', (0, cors_1.default)(), json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({ orm, token: req.headers.token }),
    }));
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀  Server ready at http://localhost:4000/graphql`);
}
exports.default = main;
