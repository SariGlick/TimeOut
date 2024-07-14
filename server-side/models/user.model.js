import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'Websites' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }],
  profileImage: { type: String }
});

export default mongoose.model('Users', userSchema);
