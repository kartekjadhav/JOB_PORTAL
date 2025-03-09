import express from "express"
import { signinController } from "../controller/signinController.js"
const signinRouter = express.Router()

signinRouter.post("/signin", signinController)


export default signinRouter