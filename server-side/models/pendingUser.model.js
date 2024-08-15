import mongoose, {Schema} from 'mongoose';

const PendingUsersSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
    userID: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    email: { type: String, required: true }
});

export default mongoose.model('PendingUsers', PendingUsersSchema);
