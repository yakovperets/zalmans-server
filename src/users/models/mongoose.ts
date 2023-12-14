import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connect to mongoDB");
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 8, maxLength: 20 },
});

const User = mongoose.model("user", UserSchema);
export default User;
