import mongoose from 'mongoose';

const preferenecSchema= new mongoose.Schema({
    sendEmail:{type:String,required:true},
    sendNotificationTime:{type:Number,require:true},
    soundVoice:{type:String,require:true}
})
export const Preferenec= mongoose.model('preferenecSchema',preferenecSchema)