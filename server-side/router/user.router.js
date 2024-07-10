import express from 'express';
import { 
  getUsers, 
  getUserById, 
  addUser, 
  deleteUser, 
  updatedUser, 
  updateUserProfileImage 
} 
from '../controllers/user.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updatedUser);
router.put('/users/:id/profile-image', upload.single('profileImage'), updateUserProfileImage);

export default router;
