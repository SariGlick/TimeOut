
import {
  getAllMessages,
  getMessageById,
  getMessagesByUserId,
  createMessage,
  updateMessageById,
  deleteMessageById
} from '../services/messages.service.js';

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

export const addMessageController = async (req, res) => {
  try {
    const message = await createMessage(req.body);
    return res.status(201).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateMessageController = async (req, res) => {
  try {
    const message = await updateMessageById(req.params.id, req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteMessageController = async (req, res) => {
  try {
    const result = await deleteMessageById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
