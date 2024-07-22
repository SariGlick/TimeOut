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

let transporter = nodemailer.createTransport({
    
  service: 'hotmail',
  secureConnection: true,
 
 
  auth: {
     user: 'timeout1@outlook.co.il',
     pass: 'time1122'}
});

export const sendEmail = async (req, res) => {
  //  const { to, subject, text } = req.body;
  const user= "st3196420@gmail.com"
debugger
  try {
      await transporter.sendMail({
          from: 'איפוס סיסמאTIMEOUT ',
          to: user,
          subject : "succsesssssss",
          text: "this is the kod"
      });
     console.log({ message: 'Email sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      // res.status(500).json({ message: 'Failed to send email.' });
  }
};
// module.exports = { sendEmail };
// sendEmail({}, {});

export const addUser = async (req, res,next) => {
  const { name, password, email } = req.body;
  const user= await User.findOne({email})
  if(user)
    return next({message:"user is exist"})
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
    console.log(req.body,"klkl");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log('Password from request:', password);
      console.log('Password from database:', user.password);
      
      bcrypt.compare( password, user.password, (err, same) => {
        if (err) {
          console.log("Error in bcrypt compare:", err);
          return next(new Error(err.message));
        }

        if (same) {
          user.password = "****";
          const token=generateToken(user);
          console.log("Password match successful");
          return res.send({ user,token });
        } else {
          console.log("Password does not match");
          return res.status(401).send({ message: 'Auth Failed' });
        }
      });
    } else {
      console.log("User not found");
      return res.status(401).send({ message: 'Auth Failed' });
    }
  } catch (error) {
    console.log("Server error:", error);
    return next(new Error('Server Error'));
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

    res.status(200).send('Password updated successfully');
  } catch (error) {
    res.status(500).send('Server error');
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


