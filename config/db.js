import mongoose from 'mongoose';

export const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};
