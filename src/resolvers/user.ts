import { User } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver, ObjectType } from "type-graphql";
import argon2 from 'argon2'

@InputType()
class UserDataInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg("options", () => UserDataInput) options: UserDataInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, {
            username: options.username,
            password: hashedPassword
        })
    await em.persistAndFlush(user)
    return user
    }
    
    @Mutation(() => UserResponse)
    async login(
        @Arg("options", () => UserDataInput) options: UserDataInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, {username: options.username})        
        if (!user) {
            return {
                errors: [
                    {
                    field: "username",
                    message: "that username doesn't exist",
                    },
                ],
            }
        }
    const valid = await argon2.verify(user.password, options.password)
    if (!valid) {
            return {
                errors: [
                    {
                    field: "password",
                    message: "invalid password",
                    },
                ],
            }
    }
    return {
        user
    }
    }
}