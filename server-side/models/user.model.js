
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true ,uniqe:true},
  password: { type: String },
  googleId: { type: String },
  profileImage: { type: String,default:"profile.jpg" },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'VisitedWebsite' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  viewProfiles: [{ type: Schema.Types.ObjectId, ref: 'Profiles' }],
  preferences: { type: Schema.Types.ObjectId, ref: 'Preference' }
 

}, { strictPopulate: false });

export default mongoose.model('Users', userSchema);
export const generateToken = (user) => {
  const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
  const data = {  user_id: user._id };
  const token = jwt.sign(data, privateKey, { expiresIn: '1h' });
  return token;
};
