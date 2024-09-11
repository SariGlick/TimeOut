import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser, signIn ,getUserId} from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/me', getUserId); 
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/signin', signIn); 
usersRouter.post('/', upload.single('profileImage'), addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', upload.single('profileImage'), updatedUser);

export default usersRouter;
