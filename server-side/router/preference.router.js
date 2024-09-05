import  express from 'express';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js'
import  upload from '../middleware/uploadFiles.js';

const preferencesRouter=express.Router();
preferencesRouter.get('/',getAllPreference);
preferencesRouter.get('/:id',getPreferenceById);
preferencesRouter.post('/',upload.single('soundVoice'),addPreference);
preferencesRouter.put('/:id',upload.single('soundVoice'),updatePreference);
preferencesRouter.delete('/:id',deletePreference);


export default preferencesRouter;
