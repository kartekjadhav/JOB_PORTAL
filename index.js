import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import morgan from "morgan"
import signupRouter from "./routes/signupRouter.js"
import signinRouter from "./routes/signinRouter.js"
import {errorMiddleware} from "./middlewares/errorMiddleware.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;


//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


//Routes
app.use("/api/v1", signupRouter)
app.use("/api/v1", signinRouter)

//error middleware
app.use(errorMiddleware)




async function initial_config(){
    await connectDB();
    app.listen(3000, () => {console.log("Server is running")})
}


initial_config()