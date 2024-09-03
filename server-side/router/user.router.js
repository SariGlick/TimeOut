import express from 'express';

import { getUsers, getUserById, addUser, deleteUser, updatedUser,signIn ,resetPassword} from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', addUser);
userRouter.post('/signIn', signIn);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updatedUser);
userRouter.put('/', resetPassword);



export default userRouter;

