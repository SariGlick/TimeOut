import express from 'express';
<<<<<<< HEAD

import { getUsers, getUserById, addUser, deleteUser, updatedUser, updateUserProfileImage,signIn ,resetPassword} from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';
=======
import { getUsers, getUserById, addUser, deleteUser, updatedUser } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/',upload.single('profileImage'), addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id',upload.single('profileImage'), updatedUser);

>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3

export default usersRouter;

<<<<<<< HEAD
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', addUser);
userRouter.post('/signIn', signIn);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updatedUser);
userRouter.put('/', resetPassword);

userRouter.put('/:id', upload.single('profileImage'), updateUserProfileImage);

export default userRouter;

=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
