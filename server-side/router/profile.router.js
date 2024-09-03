import express from 'express'
<<<<<<< HEAD
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profile.controller.js'

const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id',updateProfile);
export default profileRouter;

=======
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile,activeProfileByUserId} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();

profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.post('/activeProfile',activeProfileByUserId);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);

export default profilesRouter;
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
