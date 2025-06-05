import { GraphQLSchema } from "graphql";
import { Query } from "./query.js";
import { Mutation } from "./mutation.js";

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
