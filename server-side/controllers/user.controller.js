import User, { generateToken } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import path from 'path';
import fs from 'fs';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('visitsWebsites profiles preferences');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
};

export const getUserById = async (req, res) => {
  try {
    const idParams = req.params.id;
    const user = await User.findById(idParams).populate('visitsWebsites profiles preferences');
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user');
  }
};

export const addUser = async (req, res,next) => {
  const { name, password, email } = req.body;
  const user= await User.findOne({email})
  if(user)
    return res.status(400).send('user is exist');
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.send('Data saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user');
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare( password, user.password, (err, same) => {
        if (err) {
          const error = new Error(err.message);
          error.status = 500; 
          return next(error);
        }
        if (same) {
          user.password = "****";
          const token=generateToken(user);
          res.cookie('token', token, { httpOnly: true, secure: true });
          return res.status(200).send({ user });
        } else {
          return res.status(401).send({ message: 'Auth Failed' });
        }
      });
    } else {
      return res.status(401).send({ message: 'Auth Failed' });
    }
  } catch (error) {
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
export const deleteUser = async (req, res) => {
  try {
    const idParams = req.params.id;
    const user = await User.findByIdAndDelete(idParams);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.send('User deleted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
};

export const updatedUser = async (req, res) => {
  try {
    const idParams = req.params.id;
    const { name, password, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      idParams,
      { name, password, email },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).send('User not found...');
      return;
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
};

export const updateUserProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send('No file uploaded.');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // מחיקה של התמונה הישנה אם קיימת
    if (user.profileImage) {
      const oldImagePath = path.join('uploads', path.basename(user.profileImage));
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('Failed to delete old image:', err);
      });
    }

    user.profileImage = `uploads/${profileImage.filename}`;
    await user.save();

    res.status(200).send('Profile image updated successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating profile image.');
  }
};


