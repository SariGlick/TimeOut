import mongoose from 'mongoose';

const PreferenceSchema= new mongoose.Schema({
<<<<<<< HEAD

=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
    emailFrequency:{type:String,default:'never',enum:['never','daily', 'weekly','monthly','yearly']},
    sendNotificationTime:{type:Number,default:30,required:true},
    soundVoice:{type:String,default:'×××ª ××¢× ×¢×©×'},
    language:{type:String, default:'en',emun:['en', 'he', 'es']}
})
export default mongoose.model('Preference',PreferenceSchema);
<<<<<<< HEAD

=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
