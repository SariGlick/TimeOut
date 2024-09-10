import  express from 'express';

// import { getMessages,getMessageById,addMessage, updateMessage, deleteMessage,getMessagesByUserId } from '../controllers/message.controller.js';
const MessageRouter=express.Router();

MessageRouter.get('/',getMessages);
MessageRouter.get('/:id', getMessageById);
MessageRouter.get('/user/:userId',getMessagesByUserId );
MessageRouter.post('/',addMessage);
MessageRouter.put('/:id',updateMessage);
MessageRouter.delete('/:id',deleteMessage);

export default MessageRouter;
