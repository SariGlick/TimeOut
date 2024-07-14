import  mongoose from 'mongoose';
const websitesSchema= new mongoose.Schema({
    name:{type:String},
    url:{type:String,required:true}
})
export default  mongoose.model('Websites',websitesSchema)