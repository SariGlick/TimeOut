import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile, getProfilesByUserId,updateLocation} from '../controllers/profile.controller.js'

const profileRouter=express.Router();
profileRouter.get('/',getAllProfiles);
profileRouter.get('/:id',getProfileById);
profileRouter.post('/',createProfile);
profileRouter.delete('/:id',deleteProfile);
profileRouter.put('/:id', updateProfile);
profileRouter.get('/user/:id', getProfilesByUserId);
profileRouter.post('/updateLocation', updateLocation);
export default profileRouter;

