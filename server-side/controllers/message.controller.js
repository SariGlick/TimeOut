

import Message from '../models/Message.model.js';
import MessageType from '../models/MessageType.model.js';



export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().select('-__v');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMessageById = async (req, res) => {
  try {

    const message = await Message.findById(req.params.id,{__v:0}) //.populate('type').populate('userId');

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMessagesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;   
    const messages = await Message.find({ userId }).select('-__v').populate('type', 'type -_id');
    
    if (!messages) {
      return res.status(404).json({ error: 'Messages not found' });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { type, userId, date, read } = req.body;    
    
    const messageType = await MessageType.findById(type);
    if (!messageType) {
      return res.status(400).json({ error: 'Invalid message type' });
    }
    
    const message = new Message({ type, userId, date, read });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );   
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


