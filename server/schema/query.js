import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLError
} from "graphql";

import User from "../models/user.js";
import Company from "../models/company.js";
import { UserType, CompanyType } from "./types.js";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        console.log("User:", args);
        let user = await User.findById(args.id);
        if (!user)
          throw new GraphQLError("User of id: " + args.id + " not found");
        return user;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, context) {
        console.log("context:", context);
        // if (context.token !== "123")
        //   throw new GraphQLError("You are Unauthorized");
        return User.find();
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log("Company:", args);
        return Company.findById(args.id);
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return Company.find();
      }
    }
  }
});
