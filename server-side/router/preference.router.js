import  express from 'express';
import  upload from '../middleware/uploadFiles.js';
import  {getAllPreference,getPreferenceById,updatePreference,deletePreference,addPreference} from '../controllers/preference.controller.js'

const router=express.Router();
router.get('/',getAllPreference);
router.get('/:id',getPreferenceById);
router.post('',upload.single('soundVoice'),addPreference);
router.put('/:id',upload.single('soundVoice'),updatePreference);
router.delete('/:id',deletePreference);
export default router;