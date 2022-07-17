import { Entity, PrimaryKey, Property, OptionalProps } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    [OptionalProps]?: 'updatedAt' | 'createdAt';

    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date()})
    updatedAt = new Date();

    @Field()
    @Property({ unique: true })
    username!: string;

    @Property()
    password!: string;
}