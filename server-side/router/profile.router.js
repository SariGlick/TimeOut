import express from 'express'
<<<<<<< HEAD
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile, getProfilesByUserId} from '../controllers/profile.controller.js'

const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id', updateProfile);
profileRouter.get('/user/:id', getProfilesByUserId);
export default profileRouter;

=======
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile, getProfilesByUserId,updateLocation,activeProfileByUserId} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();
profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id', updateProfile);
profilesRouter.post('/activeProfile',activeProfileByUserId);
profilesRouter.get('/user/:id', getProfilesByUserId);
profilesRouter.post('/updateLocation', updateLocation);
export default profilesRouter;
>>>>>>> 82fa524d03d5df0b94a5d120e47c7ca054cee709
