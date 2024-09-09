import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile,shareProfile,updateProfilesByInvitation} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();

profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);
profilesRouter.post('/shareProfile',shareProfile);
profilesRouter.put('/acceptSharing/:id',updateProfilesByInvitation);

<<<<<<< HEAD
export default profilesRouter;

=======
export default profilesRouter;
>>>>>>> bfbcc67dc1c843746542105d3d6332eedff71e83
