import User from "./models/mongoose";
import { LoginDetailsType, UserType } from "./types/types";

export const registerUser = async (userFromClient: UserType) => {
  try {
    const user = new User(userFromClient);
    await user.save();
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("user not found");
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async ({ email, password }: LoginDetailsType) => {
  try {
    const user = User.findOne({ email: email, password: password });
    if (!user) throw new Error("email or password incorrect");
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};
