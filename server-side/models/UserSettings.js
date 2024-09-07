import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	settings: { type: Object, required: true },
});

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);

export default UserSettings;
