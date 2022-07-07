import { User } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon2 from 'argon2'

@InputType()
class UserDataInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Mutation(() => String)
    async register(
        @Arg("userdata") userdata: UserDataInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await argon2.hash(userdata.password)
        const user = em.create(User, { username: userdata.username, password: hashedPassword })
        await em.persistAndFlush(user)
        return "booba"
    }
}