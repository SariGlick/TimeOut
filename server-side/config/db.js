import mongoose from 'mongoose';

export const connectMongo = () => {
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err.message));
}
export const disconnectMongo = async () => {
  await mongoose.disconnect();
  console.log('mongoDB disconnected');
};

