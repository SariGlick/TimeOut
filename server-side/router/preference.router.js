import  express from 'express';
import  upload from '../middleware/uploadFiles.js';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js'

const router=express.Router();
router.get('/preferences',getAllPreference);
router.get('/preferences/:id',getPreferenceById);
router.post('/preferences',upload.single('soundVoice'),addPreference);
router.put('/preferences/:id',upload.single('soundVoice'),updatePreference);
router.delete('/preferences/:id',deletePreference);
export default router;