import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profileController'
const router=express.Router();
router.get('/profiles',getAllProfiles);
router.get('/profiles/:id',getProfileById);
router.post('/profiles',createProfile);
router.delete('/profiles/:id',deleteProfile);
router.put('/profiles/:id',updateProfile);
export default router;