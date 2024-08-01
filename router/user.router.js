import express from 'express';
import { 
  getUsers, 
  getUserById, 
  addUser, 
  deleteUser, 
  updatedUser, 
  updateUserProfileImage ,
  // sendEmail,
  getByEmail,
  getUserByGoogleAccount,
  googleLogin,
  getCode
} 
from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updatedUser);
router.put('/users/:id/profile-image', upload.single('profileImage'), updateUserProfileImage);
// router.get('/sendEmail', sendEmail);
router.get('/getByEmail/:email', getByEmail);
router.get('/getNewPassword/:email',getCode);
router.get("/users/:token/:email", getUserByGoogleAccount)
router.get("/users/:token/:email", googleLogin)
export default router;
