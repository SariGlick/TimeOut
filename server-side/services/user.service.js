import Users from "../models/user.model.js";
import bcrypt from 'bcrypt';
export const getUserById_service = async (id) => {
    return await Users.findById(id).populate('visitsWebsites profiles preferences').select('-__v');
}

export const signInService = async (email, password) => {
  const user = await Users.findOne({ email });
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
    const { email, password } = userData;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw { message: 'user is exist.', status: 400 };
    }
    if (file) {
      userData.profileImage = file.originalname;
    }
    userData.password = await bcrypt.hash(password, 10);
    const newUser = new Users(userData);
    await newUser.validate();
    await newUser.save();
    return newUser;
  };
export const getUserByEmail_service=async(email)=>{
   return await Users.findOne({ email }).populate({ path: 'visitsWebsites', populate: { path: 'websiteId' } }).populate('profiles preferences').select('-__v');
}
