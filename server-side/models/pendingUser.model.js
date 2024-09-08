import mongoose, {Schema} from 'mongoose';

const PendingUsersSchema = new mongoose.Schema({
    email: { type: String, required: true }
});
export default mongoose.model('PendingUsers', PendingUsersSchema);
