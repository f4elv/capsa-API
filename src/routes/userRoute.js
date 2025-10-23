import express from "express";
import { createUser, login, getMe, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post( "/register", createUser);
userRouter.post( "/login", login);
userRouter.get( "/me", authMiddleware, getMe);
userRouter.put( "/me", authMiddleware, updateUser);

export default userRouter;
