import userModel from '../Models/user.model.js';
import bcrypt from 'bcrypt';
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate('visitsWebsites profiles preferences');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
};
const getUserId = async (req, res) => {
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
const addUser = async (req, res) => {
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
const deleteUser = async (req, res) => {
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
const updatedUser = async (req, res) => {
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
export {
  getUsers,
  getUserId,
  addUser,
  deleteUser,
  updatedUser
};