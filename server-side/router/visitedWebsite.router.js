import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSite.controller.js'
const router=express.Router();
router.get('/',getAllVisitedWebsites)
router.get('/:id',getVisitedWebsiteById)
router.post('/',createVisitedWebsite)
router.put('/:id',updateVisitedWebsite)
router.delete('/:id',deleteVisitedWebsite)
export default router;