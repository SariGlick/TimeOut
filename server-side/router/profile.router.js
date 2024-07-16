import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profile.controller.js'
const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id',updateProfile);
export default profileRouter;
