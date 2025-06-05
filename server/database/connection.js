import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    if (!url) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    await mongoose.connect(
      url,
      {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true
      }
    );
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
