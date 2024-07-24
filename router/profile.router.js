import express from 'express';
import { getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile, getProfilesByUserId } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);
router.get('/user/:id', getProfilesByUserId);

export default router;
