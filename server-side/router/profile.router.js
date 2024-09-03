import express from 'express'
import {getAllProfiles,getProfileById,createProfile,deleteProfile,updateProfile} from '../controllers/profile.controller.js'

const profilesRouter=express.Router();

profilesRouter.get('/',getAllProfiles);
profilesRouter.get('/:id',getProfileById);
profilesRouter.post('/',createProfile);
profilesRouter.delete('/:id',deleteProfile);
profilesRouter.put('/:id',updateProfile);

<<<<<<< HEAD
<<<<<<< HEAD
export default profilesRouter;

=======
export default profilesRouter;
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
=======
export default profilesRouter;
>>>>>>> e1846fe75f6d92f5dfa7a440988cb38473a34797
