import express from 'express';

import { getUsers, getUserById, addUser, deleteUser, updatedUser, updateUserProfileImage,signIn ,resetPassword} from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', addUser);
userRouter.post('/signIn', signIn);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id',auth,updatedUser);
userRouter.put('/', resetPassword);
userRouter.put('/:id', upload.single('profileImage'), updateUserProfileImage);

export default userRouter;

