import userModel from "../models/userModel.js";
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const signinController = async (req, res, next) => {
    try {const {email, password} = req.body
    const user = await userModel.findOne({email});
    if (user){
        const isMatch = await user.passwordCompare(password);
        if (! isMatch){
            let error = new Error("Invalid Credentials")
            error.status = 400
            return next(error)
        }
        else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.status(201).json({
                successs: true,
                message: "Successfully signed in",
                token: token
            })
        }
    }
    else{
        next("User does not exits")
    }} catch(error){
        next(error)
    }
}