import express from "express";
import usersRouter from "./users/routes";
const router = express.Router();

router.use("api/users", usersRouter);

export default router;
