import mongoose from "mongoose";

// Replace the uri string with your connection string.

//const uriLocal = "mongodb://localhost:27017/TimeOut";

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


