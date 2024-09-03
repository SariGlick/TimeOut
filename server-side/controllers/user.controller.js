import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';


export const getUsers = async (req, res,next) => {
  try {
    const users = await Users.find().populate('visitsWebsites profiles preference' ).select('-__v')
    .select('-__v')
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};

export const getUserById = async (req, res,next) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id))
    return next({message:'id is not valid'})
  try {
    const user = await Users.findById(id).populate('visitsWebsites profiles preference').select('-__v');
    if (!user) {
        return next({message:'user not found ',status:404})
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
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


