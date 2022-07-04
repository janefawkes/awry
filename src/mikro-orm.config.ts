import { Options } from '@mikro-orm/core';
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import path from 'path';

const config: Options = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: "/^[\w-]+\d+\.[tj]s$/",
    },
    entities: [Post],
    dbName: "lireddit",
    type: "postgresql",
    debug : !__prod__,
    password: "riktah",
    allowGlobalContext: true
};

export default config;