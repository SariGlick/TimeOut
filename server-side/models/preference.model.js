import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
    emailFrequency:{type:String,default:'never',enum:['never','daily', 'weekly','monthly','yearly']},
    sendNotificationTime:{type:Number,default:30,required:true},
    soundVoice:{type:String,default:'alertSound.mp3'},
    timeZone:{type:String,default:'UTC'},
    language:{type:String, default:'en',emum:['en','es','he']}
})
export default mongoose.model('Preference',PreferenceSchema);
