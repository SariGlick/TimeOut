import  mongoose from 'mongoose';
const websitesSchema= new mongoose.Schema({
    name:{type:String,required:true},
    url:{type:String,required:true}
})
export default  mongoose.model('Websites',websitesSchema)