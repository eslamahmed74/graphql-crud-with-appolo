import DataLoader from "dataloader";
import Company from "../models/company.js";
import User from "../models/user.js";

export const usersCompanyLoader = () =>
  new DataLoader(async companyIds => {
    console.log("====================");
    console.log("triggering dataloader function one time", companyIds);

    // remove duplicated companyIds using (Set) not (Array)
    const uniqueIds = [...new Set(companyIds)];
    // batch operation
    const companies = await Company.find({ _id: { $in: uniqueIds } });
    return companyIds.map(
      id =>
        companies.find(company => company._id.toString() === id.toString()) ||
        null
    );
  });

export const companyUsersLoader = () =>
  new DataLoader(async companyIds => {
    // remove duplicated companyIds using (Set) not (Array)
    const uniqueIds = [...new Set(companyIds)];

    // batch operation
    const users = await User.find({ companyId: { $in: uniqueIds } });
    return companyIds.map(id => users.filter(user => user.companyId === id));
  });
