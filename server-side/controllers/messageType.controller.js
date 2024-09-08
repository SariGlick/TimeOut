import {
  getAllMessageTypesService,
  getMessageTypeByIdService,
  updateMessageTypeService,
  deleteMessageTypeService
} from '../services/messageTypeService.js';


export const getAllMessageTypes = async (req, res, next) => {
  try {
    const messageTypes = await getAllMessageTypesService();
    return res.status(200).json(messageTypes);
  } catch (error) {
    return next(error);
  }
};

export const getMessageTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const messageType = await getMessageTypeByIdService(id);
    if (!messageType) {
      return res.status(404).json({ error: 'Type not found' });
    }
    return res.status(200).json(messageType);
  } catch (error) {
    return next(error);
  }
};


export const updateMessageType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const updatedMessageType = await updateMessageTypeService(id, { type });
    if (!updatedMessageType) {
      return res.status(404).json({ error: 'MessageType not found' });
    }
    return res.status(200).json(updatedMessageType);
  } catch (error) {
    return next(error);
  }
};


export const deleteMessageType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMessageType = await deleteMessageTypeService(id);
    if (!deletedMessageType) {
      return res.status(404).json({ error: 'MessageType not found' });
    }
    return res.status(200).json({ message: 'MessageType deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
