import express from 'express';
<<<<<<< HEAD
import { 
  getUsers, 
  getUserById, 
  addUser, 
  deleteUser, 
  updatedUser, 
  updateUserProfileImage 
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

export default router;
=======
import { getUsers, getUserById, addUser, deleteUser, updatedUser, updateUserProfileImage } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', addUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updatedUser);
userRouter.put('/:id', upload.single('profileImage'), updateUserProfileImage);

export default userRouter;
>>>>>>> moriya/server-side
