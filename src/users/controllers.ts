import { Request, Response } from "express";
import * as service from "./services";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userFromClient = req.body;
    const user = await service.registerUser(userFromClient);
    return res.send(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await service.getUserById(id);
    return res.send(user);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const loginDetails = req.body;
    const token = await service.login(loginDetails);
    return res.send(token);
  } catch (error) {
    return Promise.reject(error);
  }
};
