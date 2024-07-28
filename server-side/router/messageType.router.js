import express from 'express';
import { getAllMessageTypes, getMessageTypeById,  updateMessageType, deleteMessageType } from '../controllers/messageType.controller.js';

const messageTypeRouter = express.Router();

messageTypeRouter.get('/', getAllMessageTypes);
messageTypeRouter.get('/:id', getMessageTypeById);

messageTypeRouter.put('/:id', updateMessageType);
messageTypeRouter.delete('/:id', deleteMessageType);   

export default messageTypeRouter