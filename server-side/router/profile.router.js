import express from 'express'
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