import  express from 'express';
import  upload from '../middleware/uploadFiles.js';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js'

<<<<<<< HEAD

const preferencesRouter=express.Router();

preferencesRouter.get('/',getAllPreference);
preferencesRouter.get('/:id', getPreferenceById);
preferencesRouter.post('/',upload.single('soundVoice'),addPreference);
preferencesRouter.put('/:id',upload.single('soundVoice'),updatePreference);
preferencesRouter.delete('/:id',deletePreference);

export default preferencesRouter;
=======
const router=express.Router();
router.get('/preferences',getAllPreference);
router.get('/preferences/:id',getPreferenceById);
router.post('/preferences',upload.single('soundVoice'),addPreference);
router.put('/preferences/:id',upload.single('soundVoice'),updatePreference);
router.delete('/preferences/:id',deletePreference);
export default router;
>>>>>>> bfbcc67dc1c843746542105d3d6332eedff71e83
