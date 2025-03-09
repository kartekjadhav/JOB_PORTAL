import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "India"
    }
}, {timestamp: true})

userSchema.methods.passwordCompare = async function(pass){
    let passwordCompareResult = await bcrypt.compare(pass, this.password)
    return passwordCompareResult
}

export default mongoose.model("Users", userSchema);
