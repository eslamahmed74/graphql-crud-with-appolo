import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  age: Number,
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
