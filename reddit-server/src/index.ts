require('dotenv').config({ path: '../env.d.ts' });
var cors = require('cors')

import { MikroORM } from "@mikro-orm/core"
// import { __prod__ } from "constants"
import config from "./mikro-orm.config"
import express from "express"
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up;

  const app = express()

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  // await redisClient.connect()
  app.set("trust proxy", 1);
  app.set("Access-Control-Allow-Origin", "*");
  app.set("Access-Control-Allow-Credentials", true);
  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:4000/graphql", "http://localhost:3000", "https://graphiql-online.com"]
    }),
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      },
      saveUninitialized: false,
      secret: "uwu",
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res })
  })

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log("server started on localhost:4000")
  })
};

main().catch((err) => {
  console.error(err)
})

