import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
<<<<<<< HEAD
    EmailFrequency:{type:String,default:'never',enum:['never', 'weekly','monthly','daily','yearly']},
    sendNotificationTime:{type:Number,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'}
})
export default mongoose.model('Preferences',PreferenceSchema)
=======
    emailFrequency:{type:String,default:'never',enum:['never','daily', 'weekly','monthly','yearly']},
    sendNotificationTime:{type:Number,default:30,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'},
})
export default mongoose.model('Preference',PreferenceSchema);
>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
