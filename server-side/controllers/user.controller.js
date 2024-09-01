
import User, { generateToken } from '../models/user.model.js';

import mongoose  from 'mongoose';

import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';


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
        return next({message:'user not found ',status:404})
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


export const addUser = async (req, res,next) => {
  try {
    if (req.file ) {
     req.body.profileImage=req.file.originalname;
     req.body.password= await bcrypt.hash(req.body.password, 10);
    const newUser = new Users(req.body);
    await newUser.validate();
    await newUser.save();
    res.status(201).json(newUser);
  } 
}
  catch (err) {
    console.error(err);
    next({message:err.message,status:500})
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

export const deleteUser = async (req, res,next) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return next({message:'id is not valid'})

  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return next({message:'user not found ',status:404})
      
    }
    res.send('User deleted successfully!');
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};

export const updatedUser = async (req, res,next) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return next({message:'id is not valid'})
  try {
    if (req.file) 
      req.body.profileImage = req.file.originalname;
      
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return next({message:'user not found ',status:404})
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};