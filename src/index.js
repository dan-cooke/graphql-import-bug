
import { importSchema } from 'graphql-import';
import typeDefs from './typeDefs/index.graphql';
console.log(importSchema(typeDefs));

const GraphQLJSON = require('graphql-type-json');
const express = require('express');
const merge = require('lodash/merge');
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server-express');

const { Book, Context } = require('./resolvers');

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const Query = gql`
  type Query {
    _empty: String
  }
`;

const ScalarJSON = {
  JSON: GraphQLJSON,
};

const schema = makeExecutableSchema({
  typeDefs: [Mutation, Query, typeDefs],
  resolvers: [ScalarJSON, Book],
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const server = new ApolloServer({ schema, context: Context, tracing: true });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
