import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile,activeProfileByUserId,updateProfilesByInvitation} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();

profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);
profilesRouter.put('/acceptSharing/:id',updateProfilesByInvitation);


export default profilesRouter;
