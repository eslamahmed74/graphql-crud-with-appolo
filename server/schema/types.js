// types.js
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";
import Company from "../models/company.js";
import User from "../models/user.js";

// CompanyType
const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ _id: { $in: parent.userIds } });
      }
    }
  })
});

// UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },

    companyId: { type: GraphQLID },

    company: {
      type: CompanyType,
      async resolve(parent, _args, context) {
        // return Company.findById(parent.companyId);
        // return context.usersCompanyLoader.load(parent.companyId);
        const company = await context.usersCompanyLoader.load(parent.companyId);
        return company;
      }
    }
  })
});

export { UserType, CompanyType };
