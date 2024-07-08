const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  visitsWebsites: [{ type: Schema.Types.ObjectId, ref: 'Website' }],
  profiles: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Preference' }],
  profileImage: { type: String }
});
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
