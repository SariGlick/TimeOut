import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser 
    , getByEmail,getCode, getUserByGoogleAccount
} from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/',upload.single('profileImage'), addUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id',upload.single('profileImage'), updatedUser);
usersRouter.get('/getByEmail/:email', getByEmail);
usersRouter.get('/getNewPassword/:email/:password', getCode);
usersRouter.get("/users/:token/:email", getUserByGoogleAccount)

export default usersRouter;


