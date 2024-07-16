import express from 'express'
import {getAllVisitedWebsites,getVisitedWebsiteById,deleteVisitedWebsite,updateVisitedWebsite,createVisitedWebsite} from '../controllers/visitedWebSite.controller.js'
const router=express.Router();
<<<<<<< HEAD
router.get('/vistedWebsite',getAllVisitedWebsites)
router.get('/vistedWebsite/:id',getVisitedWebsiteById)
router.post('/vistedWebsite',createVisitedWebsite)
router.put('/vistedWebsite/:id',updateVisitedWebsite)
router.delete('/vistedWebsite/:id',deleteVisitedWebsite)
=======
router.get('/',getAllVisitedWebsites)
router.get('/:id',getVisitedWebsiteById)
router.post('/',createVisitedWebsite)
router.put('/:id',updateVisitedWebsite)
router.delete('/:id',deleteVisitedWebsite)
>>>>>>> moriya/server-side
export default router;