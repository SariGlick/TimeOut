import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';

export const signIn = async (email, password) => {
  const user = await Users.findOne({ email });
  console.log(user);
  
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Authentication failed');
  }

  user.password = undefined; 
  return { user };
};

export const getUserById = async (id) => {
  return Users.findById(id).select('-password');
};

export const getUsers = async () => {
  return Users.find().select('-password');
};

export const addUser = async (data, file) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  const newUser = new Users({
    ...data,
    password: hash,
    profileImage: file?.path,
  });

  return newUser.save();
};

export const deleteUser = async (id) => {
  return Users.findByIdAndDelete(id);
};

export const updatedUser = async (id, data, file) => {
  const user = await Users.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  user.name = data.name || user.name;
  user.email = data.email || user.email;
  user.profileImage = file?.path || user.profileImage;

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
  }

  return user.save();
};
