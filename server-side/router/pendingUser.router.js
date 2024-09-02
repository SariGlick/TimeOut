import express from 'express';
import { getAllPendingUsers, createPendingUser, getPendingUserById, updatePendingUser, deletePendingUser } from '../controllers/pendingUser.controler.js';

const pendingUsersRouter = express.Router();

pendingUsersRouter.get('/', getAllPendingUsers);
pendingUsersRouter.get('/:id', getPendingUserById);
pendingUsersRouter.post('/', createPendingUser);
pendingUsersRouter.put('/:id', updatePendingUser);
pendingUsersRouter.delete('/:id', deletePendingUser);



export default pendingUsersRouter;
