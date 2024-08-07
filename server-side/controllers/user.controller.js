import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find().populate('visitsWebsites profiles preference').select('-__v');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 });
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return next({ message: 'ID is not valid' });
  
  try {
    const user = await Users.findById(id).populate('visitsWebsites profiles preference').select('-__v');
    if (!user) return next({ message: 'User not found', status: 404 });
    res.send(user);
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 });
  }
};

export const addUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.profileImage = req.file.originalname;
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newUser = new Users(req.body);
      await newUser.validate();
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 });
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return next({ message: 'ID is not valid' });

  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) return next({ message: 'User not found', status: 404 });
    res.send('User deleted successfully!');
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 });
  }
};

export const updatedUser = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return next({ message: 'ID is not valid' });

  try {
    if (req.file) req.body.profileImage = req.file.originalname;
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return next({ message: 'User not found', status: 404 });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next({ message: err.message, status: 500 });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          console.log("Error in bcrypt compare:", err);
          return next(new Error(err.message));
        }
        if (same) {
          user.password = "****";
          const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
          res.cookie('token', token, { httpOnly: true, secure: true });
          return res.send({ user });
        } else {
          return res.status(401).send({ message: 'Auth Failed' });
        }
      });
    } else {
      return res.status(401).send({ message: 'Auth Failed' });
    }
  } catch (error) {
    return next(new Error('Server Error'));
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Failed to authenticate token' });
      }
      const user = await Users.findById(decoded.id).select('-__v -password');
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send({ user });
    });
  } catch (error) {
    return next(new Error('Server Error'));
  }
};
