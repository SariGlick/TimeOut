import  express from 'express';
import  {Upload}from '../middleware/uploadFiles.js';
import  {getAllPreferenecs,getPreferenecById,updatePreferenec,deletePreferenec,addPreferenec} from '../controllers/preference.controller.js'

const router=express.Router();
router.get('/getAllPreferenecs',getAllPreferenecs);
router.get('/getPreferenecById/:id',getPreferenecById);
router.post('/addPreferenec',Upload.single('soundVoice'),addPreferenec);
router.put('/updatePreferenec/:id',Upload.single('soundVoice'),updatePreferenec);
router.delete('/deletePreferenec/:id',deletePreferenec);
export default router;