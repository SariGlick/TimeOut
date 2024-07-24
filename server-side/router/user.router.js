import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updatedUser } from '../controllers/user.controller.js';
import upload from '../middleware/uploadFiles.js';

const router=express.Router();
router.get('/users/', getUsers);
router.get('/users/:id', getUserById);
router.post('/users/', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updatedUser);

export default router;
