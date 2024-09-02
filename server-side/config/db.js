
import  mongoose from 'mongoose';


export  const connectMongo=()=>{
mongoose.connect(process.env.DB_URL)
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
}

export const disconnectMongo = async () => {
    await mongoose.disconnect();
    console.log('mongo db disconnected');
  };