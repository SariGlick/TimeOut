import  mongoose from 'mongoose';
const websitesSchema= new mongoose.Schema({
<<<<<<< HEAD
    name:{type:String},
=======
    name:{type:String,required:true},
>>>>>>> moriya/server-side
    url:{type:String,required:true}
})
export default  mongoose.model('Websites',websitesSchema)