
import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser, getUserByEmail ,signIn ,resetPassword} from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.get('/getUserByEmail/:email',getUserByEmail)
usersRouter.post('/',upload.single('profileImage'), addUser);
usersRouter.post('/signIn', signIn);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id',upload.single('profileImage'), updatedUser);
usersRouter.put('/', resetPassword);


export default usersRouter;

