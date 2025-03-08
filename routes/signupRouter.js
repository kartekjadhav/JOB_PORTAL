import express from "express";
import { signupController } from "../controller/signupController.js";
const signupRouter = express.Router();

signupRouter.post("/signup", signupController)

export default signupRouter