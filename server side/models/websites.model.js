import  mongoose from 'mongoose';
const websitesSchema= new mongoose.Schema({
    name:{type:String},
    url:{type:String,required:String}
})
export const Websites= mongoose.model('Websites',websitesSchema)