import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  profileImage: { type: String,default:"profile.jpg" },
  timeZone: { type: String,enum:['America/New_York','Europe/London','Asia/Tokyo','Asia/Jerusalem','Europe/Paris','Europe/Madrid'], default: 'Asia/Jerusalem' },
  language: { type: String, default: 'en'} ,
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preference: { type: Schema.Types.ObjectId, ref: 'Preference' }

});

export default mongoose.model('Users', userSchema);
