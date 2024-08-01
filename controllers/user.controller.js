import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import nodemailer from "nodemailer"
 
const messages = require('./texts.js');
export const getUserByGoogleAccount =async (req, res) =>{
  const user = getByEmail1 ( req.params.email)
  const clientId=  process.env.CLIENT_ID
  const clientSecret=  process.env.CLIENT_SECRET
  if (user)
    return res.status(200).send(user)
  else{
        const { tokenId } = req.params.token;
        try {
          const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: clientId
          });
          const payload = ticket.getPayload();
          const { email, name, picture } = payload;
          const token = jwt.sign({ email, name, picture }, clientSecret, { expiresIn: '1h' });
          res.json({
            token,
            userData: { email, name, picture }
          });
        } catch (error) {
          console.error( messages.error.googleError, error);
          res.status(500).json({ error: messages.error.googleError});
        }
      };

  }

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
  export const getByEmail = async (req, res) =>
    {
      try{
        const em= req.params.email
        const user = await User.findOne({ email: em })
       if(user)
        res.status(200).send(user)
      }
      catch(error){
      console.error(error);
      res.status(404).send(messages.error.notFound);
     }
    }
  export const getByEmail1 = async (email) => {
          try {
              const user = await User.findOne({ email });
              return user; 
          } catch (error) {
              console.error(messages.error.data, error);
              throw new Error(messages.error.data);
          }
      };
  export const getCode = async (req, res)=>{
    const email=req.params.email
    try{
      const user = await getByEmail1(email);
      if(user){
        //i need the funcition from the girls who responsibilities on send-email
        //  now their function is not work in normal js file
        // sendEmail(user.email,req.params.password)
        res.status(200).send( messages.su+ user.email )
      }
      else {
        res.status(404).send("Error email not found")
      }
    }
    catch{
      res.status(500).send('Internal Server Error');
    }
  
  
  }
  export const resetPassword=async (req,res,next)=>{
    const { email,password } = req.body;
  
    if (!email||!password) {
      return res.status(404).send('email and password are required');
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


export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    // .populate('visitsWebsites profiles preferences');
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

export const addUser = async (req, res) => {
  const { name, email, picture, googleId, password } = req.body;
  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : await bcrypt.hash(generateRandomPassword(), 10);
    const newUser = new User({
      name,
      email,
      googleId, // option field
      password: hashedPassword, //we have password in any case 
      profileImage: picture,
    });
    await newUser.save();
    res.status(200).json({ message: messages.addUser, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message:  messages.error.dataSave});
  }
};

const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // 8 tabs
};

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
