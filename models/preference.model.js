import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
    EmailFrequency:{type:String,default:'never',enum:['never', 'weekly','monthly','daily','yearly']},
    sendNotificationTime:{type:Number,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'}
})
export default mongoose.model('Preferences',PreferenceSchema)