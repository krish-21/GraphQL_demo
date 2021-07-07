/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

const fs = require("fs");
const path = require("path");

const { ApolloServer, PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const { getUserId } = require("./utils");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");

// Model Resolvers
const User = require("./resolvers/models/User");
const Link = require("./resolvers/models/Link");
const Vote = require("./resolvers/models/Vote");

const prisma = new PrismaClient();
const pubSub = new PubSub();

// Resolvers - Implementation of Schema
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

// Instantiate the server
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  // context is a function which returns actual context
  // attatch HTTP req of incoming GraphQL req to context
  // allow resovers to read authorization header & validate user
  context: ({ req }) => ({
    ...req,
    prisma,
    pubSub,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

// run the server
server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
