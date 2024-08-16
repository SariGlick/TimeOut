import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile,activeProfileByUserId} from '../controllers/profile.controller.js'
import { shareProfile } from '../managers/sharingManager.js';

const profilesRouter=express.Router();

profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.post('/activeProfile',activeProfileByUserId);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);
profilesRouter.post('/shareProfile',shareProfile);

export default profilesRouter;