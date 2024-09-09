
import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser, getUserByEmail } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.get('/getUserByEmail/:email',getUserByEmail)
usersRouter.post('/',upload.single('profileImage'), addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id',upload.single('profileImage'), updatedUser);

<<<<<<< HEAD


=======
>>>>>>> bfbcc67dc1c843746542105d3d6332eedff71e83
export default usersRouter;
