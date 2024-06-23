import express from "express"
import { ApolloServer } from "apollo-server-express";
import session from 'express-session'
import {typeDefs} from "./graphql/schema.js"
import {resolvers} from "./graphql/resolver.js"
import passport from 'passport'
import { router as login} from './auth/login.js'
import {initialize_passport} from './auth/passport.js'
import 'dotenv/config.js'

async function startApolloServer() {
  const app = express();
  app.use(session({
    secret: 'Remeber To Setup DOTENV for now it is alksdjalksjd12312#@!',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    maxAge: 1000 * 60 * 60 * 24 * 30
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  initialize_passport();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });


  app.use('/auth', login);


  await new Promise(resolve => app.listen({ port: process.env.PORT }, () => {console.log(`Listening on port ${process.env.PORT}`)}));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}{server.graphqlPath}`);
  return { server, app };
}

startApolloServer();