import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import nodemailer from "nodemailer"
 
// const jwt = require('jsonwebtoken');
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(''); // יש להחליף במזהה הלקוח שלך ממנהל ה-API של Google

// const nodemailer = require('nodemailer');
// קונפיגורציה של Nodemailer
// let transporter = nodemailer.createTransport({
    
//     service: 'hotmail',
//     port: 587,
//     auth: {
//       //  user: 'timeout1@outlook.co.il',
//       //  pass: 'time1122'
//        user: 'mazaltovchagit16@gmail.com',
//             pass: 'bysr woai nxmd jtti'
//       }
// });

// const transporter = nodemailer.createTransport({
//   // secureConnection: true,
//   service: 'gmail',
//   auth: {
//       user: 'mazaltovchagit16@gmail.com',
//       pass: 'bysr woai nxmd jtti'
//   }
// });
// function sendTemporaryPasswordToCustomerEmail(user) {
//   const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: 'mazaltovchagit16@gmail.com',
//           pass: 'bysr woai nxmd jtti'
//       }
//   });

//   const mailOptions = {
//       from: 'mazaltovchagit16@gmail.com',
//       to: "st3196420@gmail.com",
//       subject: 'סיסמא זמנית ND',
//       html: `
//       <div dir="rtl">
//       <p>הסיסמה הזמנית שלך היא: ${user.name}</p>
//       </div>
//   `
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//           console.error(error);
//       }
//   });

// }

// export const sendEmail = async (req, res) => {
  
//     //  const { to, subject, text } = req.body;
//     const user= "st3196420@gmail.com"
// debugger
//     try {
//         await transporter.sendMail({
//             from: 'mazaltovchagit16@gmail.com',
//             to: user,
//             subject : "succsesssssss",
//             text: "this is the kod"
//         });
//        console.log({ message: 'Email sent successfully!' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         // res.status(500).json({ message: 'Failed to send email.' });
//     }
// };

// module.exports = { sendEmail };
// sendEmail({}, {});

export const getUserByGoogleAccount =async (req, res) =>{
  const user = getByEmail1 ( req.params.email)
  if (user)
    return res.status(200).send(user)
  else{
        const { tokenId } = req.params.token;
        try {
          const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: '1079513751617-cvu5tvh0ggnogkvj8im50op7gocnehrj.apps.googleusercontent.com' // יש להחליף גם כאן במזהה הלקוח שלך
          });
          const payload = ticket.getPayload();
          const { email, name, picture } = payload;
          const token = jwt.sign({ email, name, picture }, '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', { expiresIn: '1h' }); // יש להחליף במפתח סודי עבור JWT שלך
          res.json({
            token,
            userData: { email, name, picture }
          });
        } catch (error) {
          console.error('Google login error:', error);
          res.status(500).json({ error: 'Google login failed' });
        }
        {
          
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
      // else
      //   res.status(404).send('Error email not found');
      }
      catch(error){
      console.error(error);
      res.status(404).send('Error email not found');
      // res.status(500).send('Enacorrect to db');
     }
    }
     export const getByEmail1 = async (email) => {
          try {
              const user = await User.findOne({ email });
              return user; // מחזיר את המשתמש אם נמצא, אחרת מחזיר null
          } catch (error) {
              console.error('Error: Unable to query database', error);
              throw new Error('Unable to query database');
          }
      };
  export const getKode = async (req, res)=>{
    // const us= "st3196420@gmail.com"
    const us=req.params.email
    try{
      const user = await getByEmail1( us);
      if(user){
        // sendTemporaryPasswordToCustomerEmail(user)
        // sendEmail(user.email)//, req.params.password
        sendEmail(user)
        res.status(200).send( "We will send you a verification code to " + user.email+" email" )
      }
      else
      {
        res.status(404).send("Error email not found")
      }
    }
    catch{
      // #00466a
      res.status(500).send('Internal Server Error');
      // res.status(404).send("Error email not found")
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
  const { name, password, email, } = req.body;//googleId
  if(password){
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

  }
  // else if(googleId){

  // }

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
