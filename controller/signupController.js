import userModel from "../models/userModel.js";
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

let signupDetailFormat = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    location: z.string().min(4).max(100)
})

export const signupController = async (req, res, next) => {
    const {firstName=null, lastName=null, email=null, password=null, location='India'} = req.body;
    const parseResult = signupDetailFormat.safeParse({firstName, lastName, email, password, location})

    if (parseResult.success) {
        try {
            const userExists = await userModel.findOne({email});
            if (!userExists){
                const hashedPass = await bcrypt.hash(password, 10);
                const user = await userModel.create({firstName, lastName, email, password: hashedPass, location});
                console.log("New user created");
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
                res.status(201).json({
                    success: true,
                    message: "User created",
                    user,
                    token: token
                })
            }
            else{
                next("User with given email already exits");    
            }
        } catch (error) {
            next("Internal server error.")   
        }
    }
    else{
        let error = new Error(JSON.stringify({
            field: parseResult.error.errors[0].path,
            message: parseResult.error.errors[0].message
        }))
        error.status = 400;
        next(error)
    }
}