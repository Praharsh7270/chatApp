import express from "express";
import { checkAuth, login, signup, updateProfile } from "../Controllers/UserController.js";
import { authMiddleware } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/Signup", signup);
userRouter.post("/Login", login);
userRouter.put("/UpdateProfile",authMiddleware, updateProfile)
userRouter.get("/check" , authMiddleware, checkAuth)


export default userRouter;