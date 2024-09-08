import MessageType from '../models/MessageType.model.js';


export const getAllMessageTypesService = async () => {
  return await MessageType.find().select('-__v');
};

export const getMessageTypeByIdService = async (id) => {
  return await MessageType.findById(id).select('-__v');
};


export const updateMessageTypeService = async (id, updateData) => {
  return await MessageType.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};


export const deleteMessageTypeService = async (id) => {
  return await MessageType.findByIdAndDelete(id);
};
