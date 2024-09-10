
import {
  getAllMessages,
  getMessageById,
  getMessagesByUserId,
  createMessage,
  updateMessageById,
  deleteMessageById
} from '../services/messages.service.js';
import { eventEmitter } from '../webSocket.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMessageByIdController = async (req, res) => {
  try {
    const message = await getMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMessagesByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await getMessagesByUserId(userId);
    if (!messages) {
      return res.status(404).json({ error: 'Messages not found' });
    }
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { type, userId, date, read } = req.body;
    const messageType = await MessageType.findById(type);
    if (!messageType) {
      return res.status(400).json({ error: 'Invalid message type' });
    }
    const message = await createMessage({ type, userId, date, read });
    const countUnreadMessages = await getCountUnreadMessages(userId);
    eventEmitter.emit('new-message', { userId, countUnreadMessages });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateMessageController = async (req, res) => {
  try {
    const { type, userId, date, read } = req.body;
    if (type !== undefined) updateFields.type = type;
    if (userId !== undefined) updateFields.userId = userId;
    if (date !== undefined) updateFields.date = date;
    if (read !== undefined) updateFields.read = read;
    const message = await updateMessageById(req.params.id, { type, userId, date, read });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    else {
      if (read) {
        const countUnreadMessages = await getCountUnreadMessages(message.userId);
        eventEmitter.emit('new-message', { message: message.userId, countUnreadMessages });
      }
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteMessageController = async (req, res) => {
  try {
    const message = await deleteMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getCountUnreadMessages = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID is not valid');
  }
  try {
    const allUserMassage = await Message.find({ userId, read: false }).select('-__v');
    return allUserMassage.length;
  } catch (error) {
    throw new Error(error.message);

  }
};
