import mongoose from 'mongoose';
import Users from '../models/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
import { messages } from './messages.js'; 
// import { sendEmailWithAttachment } from '../email-service/app/index.js';

const client = new OAuth2Client(process.env.CLIENT_ID);

export const getUserByGoogleAccount = async (req, res) => {
  console.log("by GA")
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
// const token= req.headers.authorization
  console.log('Received token:', token); // בדוק אם הטוקן מתקבל
  if (!token) {
    return res.status(401).send(messages.error.REQ_TOKEN);
  }

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(500).send(messages.error.FAILED_PAYLOAD);
    }

    const { sub: googleId, email, name } = payload; // Extract email from the payload

    // Check if the user exists in the database
    let user = await Users.findOne({ email });
    if (!user) {
      // Add the user if they do not exist
      user = new Users({ email, name, googleId });
      await user.save();
    }
    
    return res.status(200).json(user);

  } catch (error) {
    console.error(messages.error.VERIFY_G_TOKEN, error);
    return res.status(500).send(messages.error.VERIFY_G_TOKEN_MESSAGE);
  }
};
export const getByEmail = async (req, res) => {
  const { email } = req.params; 
  try {
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(200).send(user);
    } else {
     return res.status(404).send(messages.error.EMAIL_NOT_FOUND);
    }
  } catch (error) {
   return res.status(500).send(messages.error.INTERNAL_SERVER_ERROR); 
  }
};
export const getCode = async (req, res) => {
  const { email, password } = req.query;
  if (!email) {
    return res.status(400).send(messages.error.REQ_EMAIL);
  }
  if (!password) {
    return res.status(400).send(messages.error.REQ_PASS);
  }
  try {
    const user = await Users.findOne({email});
    if (user) {
      // sendEmailWithAttachment(user.email,messages.message.SUB_EMAIL,user.password)
      return res.status(200).send(messages.message.SEND_EMAIL + user.email);
    } else {
      return res.status(404).send(messages.error.USER_NOT_FOUND);
    }
  } catch (error) {
    return res.status(500).send(messages.error.INTERNAL_SERVER_ERROR);
  }
};
export const addUser = async (req, res) => {
  const { name, password, email, googleId } = req.body;

  if (!name || !email) {
    return res.status(400).send(messages.error.REQ_EMAIL_NAME); 
  }
  try {
    let user;
    if (googleId) {
      user = new Users({
        name,
        email,
        googleId
      });
    } else if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new Users({
        name,
        password: hashedPassword,
        email
      });
    } else {
      return res.status(400).send(messages.error.INVALID_CREDENTIALS);
    }

    const savedUser = await user.save();
    if (savedUser) {
      return res.status(200).send(messages.success.USER_REGISTERED);
    } else {
      return res.status(400).send(messages.error.REQ_PASS);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send(messages.error.INTERNAL_SERVER_ERROR);
  }
};

export const getUsers = async (req, res,next) => {
  try {
    const users = await Users.find().populate({path: 'visitsWebsites',populate: {path: 'websiteId'}}).populate('profiles preference').select('-__v');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};

export const getUserById = async (req, res,next) => {
  const id = req.params;
  if(!mongoose.Types.ObjectId.isValid(id))
   return next({ message: 'id is not valid' })
  try {
    const user = await Users.findById(id).populate('visitsWebsites profiles preferences').select('-__v');    
    if (!user) {
        return next({message:messages.error.USER_NOT_FOUND ,status:404})
    }
    if (res) {
      res.send(user);
    }
    return user;
  } catch (err) {
    console.error(err);
    if (next) {
      next({ message: err.message, status: 500 });
    } else {
      throw err;
    }
  }
};

export const updatedUser = async (req, res,next) => {
  console.log("update")
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return next({message:'id is not valid'})
  try {
    if (req.file) 
      req.body.profileImage = req.file.originalname;
      
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return next({message:messages.error.USER_NOT_FOUND,status:404})
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }

};

export const deleteUser = async (req, res) => {
  try {
    const idParams = req.params.id;
    const user = await User.findByIdAndDelete(idParams);
    if (!user) {
      res.status(404).send(messages.error.USER_NOT_FOUND);
      return;
    }
    res.status(200).send(messages.success.DELETED_USER);
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.error.INTERNAL_SERVER_ERROR);
  }
};


