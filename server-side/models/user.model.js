

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


});
=======
  viewProfiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preferences: { type: Schema.Types.ObjectId, ref: 'Preference' }
 
>>>>>>> bfbcc67dc1c843746542105d3d6332eedff71e83

}, { strictPopulate: false });

export default mongoose.model('Users', userSchema);