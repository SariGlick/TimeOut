import  express from 'express';
import { getWebsiteById,getAllWebsites,addWebSite,UpdateWebSite,deleteWebsite} from '../controllers/websites.controller.js';
 const router=express.Router();
router.get('/',getAllWebsites);
router.get('/:id',getWebsiteById);
router.put('/:id',UpdateWebSite);
router.post('/',addWebSite);
router.delete('/:id',deleteWebsite);
export default router;

