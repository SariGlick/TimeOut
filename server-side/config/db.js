
import mongoose from 'mongoose';

export const connectMongo = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err.message));
};
