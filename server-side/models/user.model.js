import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  profileImage: { type: String,default:"profile.jpg" },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preference: { type: Schema.Types.ObjectId, ref: 'Preference' }
<<<<<<< HEAD
 
=======

>>>>>>> 295121b620a2d268c1501cd8bf2cc33d3409df5f
});

export default mongoose.model('Users', userSchema);
