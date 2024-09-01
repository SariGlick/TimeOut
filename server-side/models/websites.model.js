import  mongoose from 'mongoose';
const websitesSchema= new mongoose.Schema({
<<<<<<< HEAD

    name:{type:String,required:true},

=======
    name:{type:String,required:true},
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
    url:{type:String,required:true}
})
export default  mongoose.model('Websites',websitesSchema)