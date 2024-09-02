import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const getUsers = async () => {
  return Users.find().populate('visitsWebsites profiles preference').select('-__v');
};

export const getUserById = async (id) => {
  return Users.findById(id).populate('visitsWebsites profiles preference').select('-__v');
};

export const addUser = async (userData, file) => {
  if (file) {
    userData.profileImage = file.originalname;
  }
  userData.password = await bcrypt.hash(userData.password, 10);
  const newUser = new Users(userData);
  await newUser.validate();
  return newUser.save();
};

export const deleteUser = async (id) => {
  return Users.findByIdAndDelete(id);
};

export const updatedUser = async (id, userData, file) => {
  if (file) {
    userData.profileImage = file.originalname;
  }
  return Users.findByIdAndUpdate(id, userData, { new: true });
};
export const signIn = async (email, password) => {
  const user = await Users.findOne({ email });
  console.log(user);
  
  if (!user) {
      throw new Error('Auth Failed');
  }

  const same = await bcrypt.compare(password, user.password);
  if (!same) {
      throw new Error('Auth Failed');
  }

  user.password = "****"; 
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};


export const getUserProfile = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return Users.findById(decoded.id).select('_id');
};
