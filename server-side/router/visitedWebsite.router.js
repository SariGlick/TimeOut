import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSite.controller.js'
<<<<<<< HEAD
const router=express.Router();
router.get('/vistedWebsite',getAllVisitedWebsites)
router.get('/vistedWebsite/:id',getVisitedWebsiteById)
router.post('/vistedWebsite',createVisitedWebsite)
router.put('/vistedWebsite/:id',updateVisitedWebsite)
router.delete('/vistedWebsite/:id',deleteVisitedWebsite)
export default router;
=======

const visitedWebSitesRouter=express.Router();

visitedWebSitesRouter.get('/',getAllVisitedWebsites)
visitedWebSitesRouter.get('/:id',getVisitedWebsiteById)
visitedWebSitesRouter.post('/',createVisitedWebsite)
visitedWebSitesRouter.put('/:id',updateVisitedWebsite)
visitedWebSitesRouter.delete('/:id',deleteVisitedWebsite)
export default visitedWebSitesRouter;

>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
