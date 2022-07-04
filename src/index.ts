require('dotenv').config({ path: '../env.d.ts' });

import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants"
import { Post } from "./entities/Post"
import config from "./mikro-orm.config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

// const main = async() => {
//     const orm = await MikroORM.init(config)
//     orm.getMigrator().up()

//     const posts = await orm.em.find(Post, {})
//     console.log(posts)

//     const post = orm.em.fork({}).create(Post, {
//         title: 'booba',
//         createdAt: new Date(),
//         updatedAt: new Date()
//     });
// }

const main = async () => {
    const orm = await MikroORM.init(config);    
    await orm.getMigrator().up;
    
    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })
    
    await apolloServer.start();
    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("server started on localhost:4000")
    })
};

main().catch((err) => {
    console.error(err)
})

