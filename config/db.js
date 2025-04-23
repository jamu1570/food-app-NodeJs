import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to Database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("DB error", error)
    }
}

export default connectDB;