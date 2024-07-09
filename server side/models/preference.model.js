import mongoose from 'mongoose';

const preferenecSchema= new mongoose.Schema({
    sendEmail:{type:String,default:'never',enum:['never', 'weekly','monthly','daily']},
    sendNotificationTime:{type:Number,require:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'}
})
export const Preferenec= mongoose.model('preferenecSchema',preferenecSchema)