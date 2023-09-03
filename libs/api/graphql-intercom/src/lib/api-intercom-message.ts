import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class IntercomMessage {
  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  scope?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: typeof GraphQLJSON;
}
