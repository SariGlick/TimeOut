
import express from 'express';
const messageTypeRouter = express.Router();
import { getAllMessageTypes, getMessageTypeById,  updateMessageType, deleteMessageType } from '../controllers/messageType.controller.js';


messageTypeRouter.get('/', getAllMessageTypes);
messageTypeRouter.get('/:id', getMessageTypeById);
messageTypeRouter.put('/:id', updateMessageType);
messageTypeRouter.delete('/:id', deleteMessageType);   

 export default messageTypeRouter