import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile,activeProfileByUserId} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();

profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.post('/activeProfile',activeProfileByUserId);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);

<<<<<<< HEAD
export default profilesRouter;

=======
export default profilesRouter;
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
