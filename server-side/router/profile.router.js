import express from 'express'
<<<<<<< HEAD
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profile.controller.js'
const router=express.Router();
router.get('/profiles',getAllProfiles);
router.get('/profiles/:id',getProfileById);
router.post('/profiles',createProfile);
router.delete('/profiles/:id',deleteProfile);
router.put('/profiles/:id',updateProfile);
export default router;
=======
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile, getProfilesByUserId} from '../controllers/profile.controller.js'

const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id', updateProfile);
profileRouter.get('/user/:id', getProfilesByUserId);
export default profileRouter;

>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
