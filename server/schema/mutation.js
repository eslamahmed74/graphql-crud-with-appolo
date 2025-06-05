import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} from "graphql";
import { UserType } from "./types.js";
import User from "../models/user.js";
import Company from "../models/company.js";
import mongoose from "mongoose";

export const Mutation = new GraphQLObjectType({
         name: "Mutation",
         fields: {
           // add user
           addUser: {
             type: UserType,
             args: {
               // (optional) by default
               // make it (required) using (new GraphQLNonNull)
               firstName: { type: new GraphQLNonNull(GraphQLString) },
               age: { type: new GraphQLNonNull(GraphQLInt) },
               companyId: { type: new GraphQLNonNull(GraphQLID) }
             },
             async resolve(parent, args, context) {
               console.log("context:", context);
               // if (context.token !== "123")
               //   throw new GraphQLError("You are Unauthorized");
               // check (companyId) is valid or not
               if (!mongoose.Types.ObjectId.isValid(args.companyId)) {
                 throw new Error("Invalid Company ID");
               }
               const company = await Company.findById(args.companyId);
               // check (company) exist or not
               if (!company) {
                 throw new Error("Company not found");
               }
               const user = await new User(args);
               return user.save();
             }
           },
           // update user
           updateUser: {
             type: UserType,
             args: {
               id: { type: new GraphQLNonNull(GraphQLID) },
               firstName: { type: new GraphQLNonNull(GraphQLString) },
               age: { type: GraphQLInt },
               companyId: { type: GraphQLID }
             },
             async resolve(parent, args, context) {
               console.log("context:", context);
               // if (context.token !== "123")
               //   throw new GraphQLError("You are Unauthorized");
               if (Object.keys(args).length === 2) {
                 throw new Error("No fields to update");
               }
               let existUser = await User.findById(args.id);
               // check (user) exist or not
               if (!existUser) {
                 throw new Error("User not found");
               }

               // check (companyId) is valid or not
               if (args.companyId) {
                 if (!mongoose.Types.ObjectId.isValid(args.companyId)) {
                   throw new Error("Invalid Company ID");
                 }
                 const company = await Company.findById(args.companyId);
                 if (!company) {
                   throw new Error("Company not found");
                 }
                 existUser.companyId = args.companyId;
               }

               Object.assign(existUser, args);
               const updatedUser = await existUser.save();
               return updatedUser.save();
             }
           },
           // delete user
           deleteUser: {
             type: UserType,
             args: {
               id: { type: new GraphQLNonNull(GraphQLID) }
             },
             async resolve(parent, args, context) {
               console.log("context:", context);
               // if (context.token !== "123")
               //   throw new GraphQLError("You are Unauthorized");
               if (!mongoose.Types.ObjectId.isValid(args.id)) {
                 throw new Error("Invalid User ID");
               }
               const deletedUser = await User.findByIdAndDelete(args.id);
               if (!deletedUser) {
                 throw new Error("User not found");
               }
               return deletedUser;
             }
           }
         }
       });
