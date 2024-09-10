import mongoose from 'mongoose';
import Message from '../models/Message.model.js';
import MessageType from '../models/MessageType.model.js';
import { eventEmitter } from '../webSocket.js'; 

export const getAllMessages = async () => {
  return await Message.find().select('-__v');
};

export const getMessageById = async (id) => {
  return await Message.findById(id, { __v: 0 });
};

export const getMessagesByUserId = async (userId) => {
  return await Message.find({ userId }).select('-__v').populate('type', 'type -_id');
};

export const createMessage = async ({ type, userId, date, read }) => {
  const messageType = await MessageType.findById(type);
  if (!messageType) {
    throw new Error('Invalid message type');
  }
  const message = new Message({ type, userId, date, read });
  await message.save();
  const countUnreadMessages = await getCountUnreadMessages(userId);
  eventEmitter.emit('new-message', { userId, type: "countUnread", countUnreadMessages });
  return message;
};

export const updateMessageById = async (id, { type, userId, date, read }) => {
  const message = await Message.findByIdAndUpdate(
    id,
    { type, userId, date, read },
    { new: true, runValidators: true }
  );   
  if (!message) {
    throw new Error('Message not found');
  }
  const countUnreadMessages = await getCountUnreadMessages(userId);
  eventEmitter.emit('new-message', { userId, type: "countUnread", countUnreadMessages });
  return message;
};

export const deleteMessageById = async (id) => {
  const message = await Message.findByIdAndDelete(id);
  const userId=message.userId;  
  if (!message) {
    throw new Error('Message not found');
  }
  const countUnreadMessages = await getCountUnreadMessages(userId);
  eventEmitter.emit('new-message', { userId: userId.toString(), type: "countUnread", countUnreadMessages });
  return { message: 'Message deleted successfully' };
};

export const getCountUnreadMessages = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID is not valid');
  }
  const allUserMassage = await Message.find({ userId, read: false }).select('-__v');
  return allUserMassage.length;
};
