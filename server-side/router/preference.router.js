import  express from 'express';
import  upload from '../middleware/uploadFiles.js';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js'

const preferencesRouter=express.Router();
preferencesRouter.get('/',getAllPreference);
preferencesRouter.get('/:id', getPreferenceById);
preferencesRouter.post('/',upload.single('soundVoice'),addPreference);
preferencesRouter.put('/:id',upload.single('soundVoice'),updatePreference);
preferencesRouter.delete('/:id',deletePreference);
export default preferencesRouter;
