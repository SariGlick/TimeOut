import  express from 'express';
import { getWebsiteById,getAllWebsites,addWebSite,UpdateWebSite,deleteWebsite} from '../controllers/websites.controller.js';
<<<<<<< HEAD
 const router=express.Router();

router.get('/',getAllWebsites);
router.get('/:id',getWebsiteById);
router.put('/:id',UpdateWebSite);
router.post('/',addWebSite);
router.delete('/:id',deleteWebsite);

export default router;
=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3

 const websitesRouter=express.Router();

websitesRouter.get('/',getAllWebsites);
websitesRouter.get('/:id',getWebsiteById);
websitesRouter.put('/:id',UpdateWebSite);
websitesRouter.post('/',addWebSite);
websitesRouter.delete('/:id',deleteWebsite);

export default websitesRouter;
