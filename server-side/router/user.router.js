import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';
import { auth as authMiddleware} from '../middleware/auth.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/',upload.single('profileImage'), addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id',authMiddleware, updatedUser);

export default usersRouter;


