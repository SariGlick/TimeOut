import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
 
    emailFrequency:{type:String,default:'never',enum:['never','daily', 'weekly','monthly','yearly']},
    sendNotificationTime:{type:Number,default:30,required:true},
    soundVoice:{type:String,default:'alertSound.mp3'},
    timeZone:{type:String,default:'UTC'},
    language:{type:String, default:'en',emum:['en','es','he']},
    dateFormat:{type:String,default:'DD-MM-YYYY',emum:['MM-DD-YYYY','DD-MM-YYYY','YYYY-MM-DD']},
    displayIncomeMessages:{type:Boolean,default:false},
    displayBrowsingTimeLimit:{type:Boolean,default:false},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'},
    language:{type:String, default:'en',emun:['en', 'he', 'es']},
    EmailFrequency:{type:String,default:'never',enum:['never', 'weekly','monthly','daily','yearly']},
    sendNotificationTime:{type:Number,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'}
})
export default mongoose.model('Preference',PreferenceSchema);
