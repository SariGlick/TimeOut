import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';
require('dotenv').config();
const messages = require('./messages');
const crypto = require('crypto');

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
        return next({message:messages.error.USER_NOT_FOUND ,status:404})
    }
    res.send(user);
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
      return next({message:messages.error.USER_NOT_FOUND,status:404})
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next({message:err.message,status:500})
  }
};

export const getUserByGoogleAccount =async (req, res) =>{
  const clientId = process.env.CLIENT_ID;
  const secretCode = process.env.SECRET_CODE
  const user = getByEmail1 ( req.params.email)
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
          const token = jwt.sign({ email, name, picture },secretCode, { expiresIn: '1h' }); 
          res.json({
            token,
            userData: { email, name, picture }
          });
        } catch (error) {
          console.error(messages.error.G_LOGIN_FAILED, error);
          res.status(500).json({ error: messages.error.G_LOGIN_FAILED});
        }
        {
          
        }
      };

  }

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
      res.status(404).send(messages.error.EMAIL_NOT_FOUND);
     }
    }
  export const getByEmail1 = async (email) => {
          try {
              const user = await User.findOne({ email });
              return user; 
          } catch (error) {
              console.error(messages.error.INTERNAL_SERVER_ERROR, error);
              throw new Error(messages.error.INTERNAL_SERVER_ERROR);
          }
      };
  export const getCode = async (req, res)=>{
    const us=req.params.email
    try{
      const user = await getByEmail1( us);
      if(user){
        sendEmail(user)
        res.status(200).send(messages.message.SEND_EMAIL + user.email )
      }
      else
      {
        res.status(404).send(messages.error.EMAIL_NOT_FOUND)
      }
    }
    catch{
      res.status(500).send(messages.error.INTERNAL_SERVER_ERROR);

    }
  
  
  }

export const addUser = async (req, res) => {
  const { name, password, email, googleId} = req.body;
{
    try {
        if (googleId) {
          const randomPassword = crypto.randomBytes(16).toString('hex');
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
          const newUser = new User({
            name,
            password: hashedPassword,
            email,
            googleId
          });
          await newUser.save();
        } 
        else {
          if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
              name,
              password: hashedPassword,
              email
            });
            await newUser.save();
            res.status(200).send(messages.success.USER_REGISTERED);
          } else {
            res.status(400).send(messages.error.REQ_PASS);
          }
        }
    } catch (err) {
      console.error(err);
      res.status(500).send(messages.error.INTERNAL_SERVER_ERROR);
    }

  }
    

 }

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



