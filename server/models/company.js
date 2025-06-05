import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  slogan: String,
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);
export default Company;
