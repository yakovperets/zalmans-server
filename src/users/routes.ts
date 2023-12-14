import express from "express";
import { getUserById, login, registerUser } from "./controllers";
const router = express.Router();

router.post("signup", registerUser);

router.post("signin", login);

router.get(":id", getUserById);

export default router;
