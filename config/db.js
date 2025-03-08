import mongoose from "mongoose";


const connectDB = async () => {
    try {       
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to ${mongoose.connection.host} successfully!`);
        
    } catch (error) {
        console.log(`DB Connection issue - ${error}`)
    }
}


export default connectDB