import mongoose from "mongoose";



const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
const database = mongoose.connection;

database.on('error', (error) => {
  console.log('MongoDB connection error:', error);
})

database.once('connected', () => {
  console.log('MongoDB connected...');
})

export default connectDB;


