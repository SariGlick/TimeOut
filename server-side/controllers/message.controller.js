

import mongoose from 'mongoose';
import Message from '../models/Message.model.js';
import MessageType from '../models/MessageType.model.js';
import { eventEmitter } from '../webSocket.js'; // Import event emitter

export const getMessages = async (req, res) => {
  try {
    debugger
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
    debugger
    const { type, userId, date, read } = req.body;
    const messageType = await MessageType.findById(type);
    if (!messageType) {
      return res.status(400).json({ error: 'Invalid message type' });
    }
    const message = new Message({ type, userId, date, read });
    await message.save();
    const countUnreadMessages = await getCountUnreadMessages(userId);
    eventEmitter.emit('new-message', { userId, countUnreadMessages });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateMessage = async (req, res) => {
  try {
    const { type, userId, date, read } = req.body;
    if (type !== undefined) updateFields.type = type;
    if (userId !== undefined) updateFields.userId = userId;
    if (date !== undefined) updateFields.date = date;
    if (read !== undefined) updateFields.read = read;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { type, userId, date, read },
      { new: true, runValidators: true }
    );   
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    else{
      if(read){
        const countUnreadMessages = await getCountUnreadMessages(message.userId);
        eventEmitter.emit('new-message', { message:message.userId, countUnreadMessages });
      }
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


export const getCountUnreadMessages = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID is not valid');
  }
  try {
    const allUserMassage = await Message.find({ userId , read: false }).select('-__v');
    return allUserMassage.length;
  } catch (error) {
    throw new Error(error.message);
  }
};
