import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile, getProfilesByUserId,updateLocation,activeProfileByUserId,uploadProfilesFromExcel} from '../controllers/profile.controller.js'
import upload from '../middleware/uploadFiles.js';

const profilesRouter=express.Router();
profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id', updateProfile);
profilesRouter.post('/activeProfile',activeProfileByUserId);
profilesRouter.get('/user/:id', getProfilesByUserId);
profilesRouter.post('/updateLocation', updateLocation);
profilesRouter.post('/upload', upload.single('file'), uploadProfilesFromExcel); 
export default profilesRouter;