import express from 'express';
import {
  getMessages,
  getMessageByIdController,
  getMessagesByUserIdController,
  addMessageController,
  updateMessageController,
  deleteMessageController
} from '../controllers/message.controller.js';

const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.get('/:id', getMessageByIdController);
messageRouter.get('/user/:userId', getMessagesByUserIdController);
messageRouter.post('/', addMessageController);
messageRouter.put('/:id', updateMessageController);
messageRouter.delete('/:id', deleteMessageController);

export default messageRouter;
