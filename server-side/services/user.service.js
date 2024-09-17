import Users from "../models/user.model.js";
import Preference from '../models/preference.model.js';
import bcrypt from 'bcryptjs';
export const getUserById_service = async (id) => {
    return await Users.findById(id).populate('visitsWebsites profiles preference').select('-__v');
}

export const signInService = async (email, password) => {
  const user = await Users.findOne({ email }).populate('  preference').select('-__v');;
  if (!user) {
    throw { message: 'Auth Failed', status: 401 };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { message: 'user or password doesn\'t exist or not match', status: 500 };
  }
  user.password = "****"; 
  return { user };
  };

  export const addUserService = async (userData, file) => {
    const { email, password, preference } = userData;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw { message: 'user is exist.', status: 400 };
    }
    if (file) {
      userData.profileImage = file.originalname;
    }
    userData.password = await bcrypt.hash(password, 10);
    const session = await Users.startSession();
    session.startTransaction();
  
    try {
      const newUser = new Users(userData);
      const newPreference = new Preference(preference); 
      await newPreference.save({ session });
      newUser.preference = newPreference._id;
  
      await newUser.save({ session });
      await session.commitTransaction();
      session.endSession();
      return newUser;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
export const getUserByEmail_service=async(email)=>{
   return await Users.findOne({ email }).populate({ path: 'visitsWebsites', populate: { path: 'websiteId' } }).populate('profiles preference').select('-__v');
}
