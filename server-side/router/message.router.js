import  express from 'express';
import  upload from '../middleware/uploadFiles.js';
import updateMessageStatus  from '../controllers/messagesController.js';

const messageRouter=express.Router();

messageRouter.put('/',updateMessageStatus);



export default messageRouter;
