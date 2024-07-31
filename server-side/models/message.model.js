import mongoose from 'mongoose';

const MessageSchema= new mongoose.Schema({
    read:{type:Boolean,default:'false'},
})
export default mongoose.model('Message',MessageSchema);
