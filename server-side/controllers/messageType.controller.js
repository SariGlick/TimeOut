import MessageType from '../models/MessageType.model.js';


export const getAllMessageTypes = async (req, res) => {
  try {
        const messageTypes = await MessageType.find().select('-__v');
    res.status(200).json(messageTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMessageTypeById = async (req, res) => {
  try {

    const messageType = await MessageType.findById(req.params.id).select('-__v');

    if (!messageType) {
      return res.status(404).json({ error: 'Type not found' });
    }
    res.status(200).json(messageType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





export const updateMessageType = async (req, res) => {
  try {
    const { type } = req.body;
    const updatedMessageType = await MessageType.findByIdAndUpdate(
      req.params.id,
      { type },
      { new: true, runValidators: true }
    );
    if (!updatedMessageType) {
      return res.status(404).json({ error: 'MessageType not found' });
    }
    res.status(200).json(updatedMessageType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteMessageType = async (req, res) => {
  try {
    const deletedMessageType = await MessageType.findByIdAndDelete(req.params.id);
    if (!deletedMessageType) {
      return res.status(404).json({ error: 'MessageType not found' });
    }
    res.status(200).json({ message: 'MessageType deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
