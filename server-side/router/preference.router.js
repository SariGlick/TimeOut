import  express from 'express';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js';
import  upload from '../middleware/uploadFiles.js';

const router=express.Router();
router.get('/preferences',getAllPreference);
router.get('/preferences/:id',getPreferenceById);
router.post('/preferences',upload.single('soundVoice'),addPreference);
router.put('/preferences/:id',upload.single('soundVoice'),updatePreference);
router.delete('/preferences/:id',deletePreference);
export default router;


