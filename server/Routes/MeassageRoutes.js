import express from "express";
import { authMiddleware } from "../Middleware/auth.js";
import { getMessages, getUserForSidebar, markMeasseagesAsSeen, sendMsg } from "../Controllers/MessageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, getUserForSidebar);
messageRouter.get("/:id", authMiddleware, getMessages);
messageRouter.put("mark/:id", authMiddleware, markMeasseagesAsSeen);
messageRouter.post("/send/:id" , authMiddleware , sendMsg);


export default messageRouter;
