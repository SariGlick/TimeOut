import  express from 'express';
import { getWebsiteById,getAllWebsites,addWebSite,UpdateWebSite,deleteWebsite} from '../controllers/websites.controller.js';
 const router=express.Router();
router.get('/websites',getAllWebsites);
router.get('/websites/:id',getWebsiteById);
router.put('/websites/:id',UpdateWebSite);
router.post('/websites',addWebSite);
router.delete('/websites/:id',deleteWebsite);
export default router;

