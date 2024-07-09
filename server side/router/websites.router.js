import  express from 'express';
import { getWebsitesById,getAllWebsites,addWebSites,UpdateWebSites,deleteWebsites} from '../controllers/websites.controller.js';
 const router=express.Router();
router.get('/getAllWebsites',getAllWebsites);
router.get('/getWebsitesById/:id',getWebsitesById);
router.put('/UpdateWebSites/:id',UpdateWebSites);
router.post('/addWebSites',addWebSites);
router.delete('/deleteWebsites/:id',deleteWebsites);
export default router;

