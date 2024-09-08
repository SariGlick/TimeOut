import {
  getAllMessagesService,
  getMessageByIdService,
  getMessagesByUserIdService,
  addMessageService,
  updateMessageService,
  deleteMessageService
} from '../services/messageService.js';


export const getMessages = async (req, res, next) => {
  try {
    const messages = await getAllMessagesService();
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
};


export const getMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await getMessageByIdService(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
};


export const getMessagesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const messages = await getMessagesByUserIdService(userId);
    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: 'Messages not found' });
    }
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
};


export const addMessage = async (req, res, next) => {
  try {
    const { type, userId, date, read } = req.body;
    const message = await addMessageService({ type, userId, date, read });
    return res.status(201).json(message);
  } catch (error) {
    return next(error);
  }
};


export const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await updateMessageService(id, req.body);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json(message);
  } catch (error) {
    return next(error);
  }
};


export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await deleteMessageService(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
