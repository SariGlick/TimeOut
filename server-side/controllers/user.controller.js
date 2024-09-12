import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Users, { generateToken } from '../models/user.model.js';
import {
  addUserService,
  signInService,
  getUserById_service,
  getUserByEmail_service
} from '../services/user.service.js';


export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find().populate({ path: 'visitsWebsites', populate: { path: 'websiteId' } }).populate('profiles preference').select('-__v');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 })
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next({ message: 'id is not valid' })
  try {
    const user = await getUserById_service(id);    
    if (!user) {
      return next({ message: 'user not found ', status: 500 })
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 })
  }
};

export const addUser = async (req, res,next) => {
try {
  const newUser = await addUserService(req.body, req.file);
  res.status(201).json(newUser);
} catch (error) {
  if (error.status === 500 || error.status === 400) {
    return res.status(error.status).send({ message: error.message });
  }
  error.status = 500; 
  return next(error);
}
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user } = await signInService(email, password);
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, secure: true });
    return res.status(200).send( user );
  } catch (error) {
    if (error.status === 500 || error.status === 401) {
      return res.status(error.status).send({ message: error.message });
    }
    error.status = 500; 
    return next(error);
  }
};

export const resetPassword=async (req,res,next)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and new password are required');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({message:'Password updated successfully'});
  } catch (error) {
    res.status(500).send({message:'Server error'});
  }
}

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return next({message:'id is not valid'})

  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return next({ message: 'user not found ', status: 404 })

    }
    res.send('User deleted successfully!');
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 })
  }
};

export const updatedUser = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next({ message: 'id is not valid' });

  try {
    if (req.file)
      req.body.profileImage = req.file.originalname;
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return next({ message: 'user not found', status: 404 });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 });
  }
};

export const getUserByEmail = async (req, res, next) => {
  const {email} = req.params;
  try {
    const user = await getUserByEmail_service(email);
    if (!user) {
      return next({ message: 'user not found ', status: 404 })
    }
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    return next({ message: err.message, status: 500 })
  }
}
