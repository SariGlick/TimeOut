

import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  formatedDate: { type: String,default: "yyyy-MM-dd" },
  profileImage: { type: String,default:"profile.jpg" },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }]
});

export default mongoose.model('Users', userSchema);
