import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
<<<<<<< HEAD
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'Websites' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }],
  profileImage: { type: String }
=======
  profileImage: { type: String,default:"profile.jpg" },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preferences: { type: Schema.Types.ObjectId, ref: 'Preference' }

>>>>>>> 82fa524d03d5df0b94a5d120e47c7ca054cee709
});

export default mongoose.model('Users', userSchema);