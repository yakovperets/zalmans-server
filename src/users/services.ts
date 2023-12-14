import * as dal from "./dal";
import { LoginDetailsType, UserType } from "./types/types";

export const registerUser = async (user: UserType) => {
  try {
    return await dal.registerUser(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    return await dal.getUserById(id);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (loginDetails: LoginDetailsType) => {
  try {
    return await dal.login(loginDetails);
  } catch (error) {
    return Promise.reject(error);
  }
};
