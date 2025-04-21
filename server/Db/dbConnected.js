import mongoose from "mongoose";

const dbConnected = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log("Database connected"));   
      
    } catch (error) {
        console.log(error);
    }
}
export default dbConnected