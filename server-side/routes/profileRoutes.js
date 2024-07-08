import express from 'express';
import profileController from '../controllers/profileController.js';

const router = express.Router();


// Routes for profile operations
router.get('/', profileController.getAllProfiles);
router.post('/', profileController.createProfile);
router.get('/:id', profileController.getProfileById);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

export default router;
