import  express from 'express';
import { getWebsiteById,getAllWebsites,addWebSite,UpdateWebSite,deleteWebsite} from '../controllers/websites.controller.js';
<<<<<<< HEAD
 const router=express.Router();
router.get('/websites',getAllWebsites);
router.get('/websites/:id',getWebsiteById);
router.put('/websites/:id',UpdateWebSite);
router.post('/websites',addWebSite);
router.delete('/websites/:id',deleteWebsite);
export default router;
=======

 const websitesRouter=express.Router();

websitesRouter.get('/',getAllWebsites);
websitesRouter.get('/:id',getWebsiteById);
websitesRouter.put('/:id',UpdateWebSite);
websitesRouter.post('/',addWebSite);
websitesRouter.delete('/:id',deleteWebsite);

export default websitesRouter;

>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
