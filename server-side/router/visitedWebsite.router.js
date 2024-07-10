import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSiteController'
const router=express.Router();
router.get('/vistedWebsite',getAllVisitedWebsites)
router.get('/vistedWebsite/:id',getVisitedWebsiteById)
router.post('/vistedWebsite',createVisitedWebsite)
router.put('/vistedWebsite/:id',updateVisitedWebsite)
router.delete('/vistedWebsite/:id',deleteVisitedWebsite)
export default router;