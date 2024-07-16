import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profile.controller.js'
<<<<<<< HEAD
const router=express.Router();
router.get('/profiles',getAllProfiles);
router.get('/profiles/:id',getProfileById);
router.post('/profiles',createProfile);
router.delete('/profiles/:id',deleteProfile);
router.put('/profiles/:id',updateProfile);
export default router;
=======
const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id',updateProfile);
export default profileRouter;
>>>>>>> moriya/server-side
