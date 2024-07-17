import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser, updateUserProfileImage } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const userRouter = express.Router();

userRouter.get('/users/', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.post('/users/', addUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.put('/users/:id', updatedUser);
userRouter.put('/users/:id', upload.single('profileImage'), updateUserProfileImage);

export default userRouter;
