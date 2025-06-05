import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import Company from "./models/company.js";
import User from "./models/user.js";

dotenv.config();

const seedCompanies = async () => {
  try {
    const data = await fs.readFile(
      path.resolve("./seeds/companies.json"),
      "utf-8"
    );
    const companies = JSON.parse(data);

    await Company.deleteMany();

    const insertedCompanies = await Company.insertMany(
      companies.map(company => ({
        name: company.name,
        slogan: company.slogan,
          userIds: []
      }))
    );

    console.log("✅ Companies seeded");
    return { insertedCompanies, originalCompanies: companies };
  } catch (err) {
    console.error("❌ Error seeding companies:", err.message);
    throw err;
  }
};

const seedUsers = async ({ insertedCompanies, originalCompanies }) => {
  try {
    const data = await fs.readFile(path.resolve("./seeds/users.json"), "utf-8");
    let users = JSON.parse(data);

    users = users.map(user => {
      const companyData = originalCompanies.find(company =>
        Array.isArray(company.userIds) && company.userIds.includes(user.firstName)
      );

      const company = insertedCompanies.find(c => c.name === (companyData ? companyData.name : null));

      return {
        firstName: user.firstName,
        age: user.age,
        companyId: company ? company._id : null
      };
    });

    await User.deleteMany();
    const insertedUsers = await User.insertMany(users);

    console.log("✅ Users seeded");

    for (const company of insertedCompanies) {
      const relatedUsers = insertedUsers.filter(user => user.companyId?.toString() === company._id.toString());
      company.userIds = relatedUsers.map(user => user._id);
      await company.save();
    }

    console.log("✅ Companies updated with userIds");
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
    throw err;
  }
};

const runSeed = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to DB");

    const companiesData = await seedCompanies();
    await seedUsers(companiesData);

    console.log("🌱 All data seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

runSeed();
