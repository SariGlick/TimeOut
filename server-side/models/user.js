import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'Website' }],
    profiles: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }],
    profileImage: { type: String }
});

module.exports = mongoose.model('User', userSchema);

