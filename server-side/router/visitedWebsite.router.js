import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite,showVisitedWebsite} from '../controllers/visitedWebSite.controller.js'

const visitedWebSitesRouter=express.Router();

visitedWebSitesRouter.get('/',getAllVisitedWebsites)
visitedWebSitesRouter.get('/:id',getVisitedWebsiteById)
visitedWebSitesRouter.post('/',createVisitedWebsite)
visitedWebSitesRouter.put('/:id',updateVisitedWebsite)
visitedWebSitesRouter.delete('/:id',deleteVisitedWebsite)
visitedWebSitesRouter.post('/showVisitedWebsite',showVisitedWebsite)

export default visitedWebSitesRouter;

