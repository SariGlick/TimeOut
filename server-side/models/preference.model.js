import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
    EmailFrequency:{type:String,default:'never',enum:['never', 'weekly','monthly','daily','yearly']},
    sendNotificationTime:{type:Number,require:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'}
})
export const Preference= mongoose.model('preferenecSchema',PreferenceSchema)