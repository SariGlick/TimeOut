import  express from 'express';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js'
import  upload from '../middleware/uploadFiles.js';

<<<<<<< HEAD

=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
const preferencesRouter=express.Router();

preferencesRouter.get('/',getAllPreference);
preferencesRouter.get('/:id', getPreferenceById);
preferencesRouter.post('/',upload.single('soundVoice'),addPreference);
preferencesRouter.put('/:id',upload.single('soundVoice'),updatePreference);
preferencesRouter.delete('/:id',deletePreference);

export default preferencesRouter;
