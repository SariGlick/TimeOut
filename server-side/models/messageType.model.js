
import mongoose, { Schema } from "mongoose";

const messageTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['welcome'],
    required: true,    
  }, 
});

export default mongoose.model('MessageType', messageTypeSchema);
