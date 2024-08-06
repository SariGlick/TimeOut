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
=======
import { getUsers, getUserById, addUser, deleteUser, updatedUser } from '../controllers/user.controller.js';
>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/',upload.single('profileImage'), addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id',upload.single('profileImage'), updatedUser);

<<<<<<< HEAD
export default router;
=======

export default usersRouter;


>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
