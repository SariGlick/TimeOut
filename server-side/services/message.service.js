import Message from '../models/Message.model.js';
import MessageType from '../models/MessageType.model.js';

export const findMessages = () => {
  return Message.find().select('-__v');
};

export const findMessageById = (id) => {
  return Message.findById(id).select('-__v');
};

export const findMessagesByUserId = (userId) => {
  return Message.find({ userId }).select('-__v').populate('type', 'type -_id');
};

export const createMessage = async ({ type, userId, date, read }) => {
  const messageType = await MessageType.findById(type);
  if (!messageType) {
    throw new Error('Invalid message type');
  }
  const message = new Message({ type, userId, date, read });
  return message.save();
};

export const updateMessageById = (id, body) => {
  return Message.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

export const deleteMessageById = (id) => {
  return Message.findByIdAndDelete(id);
};
