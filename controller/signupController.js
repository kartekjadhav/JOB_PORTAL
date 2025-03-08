import userModel from "../models/userModel.js";
import z from "zod";

let signupDetailFormat = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    location: z.string().min(4).max(100)
})

export const signupController = async (req, res) => {
    const {firstName, lastName, email, password, location='India'} = req.body;
    const parseResult = signupDetailFormat.safeParse({firstName, lastName, email, password, location})

    if (parseResult.success) {
        try {
            const userExists = await userModel.findOne({email});
            if (!userExists){
                const user = await userModel.create({firstName, lastName, email, password, location});
                console.log("New user created")
                res.status(201).json({
                    success: true,
                    message: "User created",
                    user
                })
            }
            else{
                res.status(400).json({
                    success: false,
                    message: "User with given email already exits"
                })    
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server issue",
                error: error
            })    
        }
    }
    else{
        res.status(400).json({
            success: false,
            message: "Invalid signup details",
            error: parseResult.error
        })
    }
}