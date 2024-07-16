import  express from 'express';
import { getWebsiteById,getAllWebsites,addWebSite,UpdateWebSite,deleteWebsite} from '../controllers/websites.controller.js';
 const router=express.Router();
<<<<<<< HEAD
router.get('/websites',getAllWebsites);
router.get('/websites/:id',getWebsiteById);
router.put('/websites/:id',UpdateWebSite);
router.post('/websites',addWebSite);
router.delete('/websites/:id',deleteWebsite);
=======
router.get('/',getAllWebsites);
router.get('/:id',getWebsiteById);
router.put('/:id',UpdateWebSite);
router.post('/',addWebSite);
router.delete('/:id',deleteWebsite);
>>>>>>> moriya/server-side
export default router;

