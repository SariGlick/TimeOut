import Message from '../models/message.model.js';

const updateMessageStatus = async (req, res) => {
  const { messageId, newStatus } = req.body;

  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: messageId },
      { read: newStatus },
      { new: true }
    );

    res.status(200).json({ message: 'Message status updated successfully', updatedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating message status' });
  }
};

export default updateMessageStatus;