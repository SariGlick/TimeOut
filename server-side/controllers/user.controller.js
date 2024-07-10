import userModel from '../Models/user.model.js';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate('visitsWebsites profiles preferences');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
};

export const getUserById = async (req, res) => {
  try {
    const idParams = req.params.id;
    const user = await userModel.findById(idParams).populate('visitsWebsites profiles preferences');
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

export const addUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
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

export const deleteUser = async (req, res) => {
  try {
    const idParams = req.params.id;
    const user = await userModel.findByIdAndDelete(idParams);
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
    const updatedUser = await userModel.findByIdAndUpdate(
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

    const user = await userModel.findById(userId);
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


