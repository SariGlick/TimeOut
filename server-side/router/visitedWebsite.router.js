import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSite.controller.js'
<<<<<<< HEAD
const router=express.Router();
router.get('/',getAllVisitedWebsites)
router.get('/:id',getVisitedWebsiteById)
router.post('/',createVisitedWebsite)
router.put('/:id',updateVisitedWebsite)
router.delete('/:id',deleteVisitedWebsite)

export default router;
=======

const visitedWebSitesRouter=express.Router();

visitedWebSitesRouter.get('/',getAllVisitedWebsites)
visitedWebSitesRouter.get('/:id',getVisitedWebsiteById)
visitedWebSitesRouter.post('/',createVisitedWebsite)
visitedWebSitesRouter.put('/:id',updateVisitedWebsite)
visitedWebSitesRouter.delete('/:id',deleteVisitedWebsite)
export default visitedWebSitesRouter;

>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
