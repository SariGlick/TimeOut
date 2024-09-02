import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  profileImage: { type: String,default:"profile.jpg" },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
<<<<<<< HEAD
  preference: { type: Schema.Types.ObjectId, ref: 'Preference' }
 
=======
  preferences: { type: Schema.Types.ObjectId, ref: 'Preference' }
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3

});

export default mongoose.model('Users', userSchema);