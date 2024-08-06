import  mongoose from 'mongoose';
const websitesSchema= new mongoose.Schema({
<<<<<<< HEAD
    name:{type:String},
=======
    name:{type:String,required:true},
>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
    url:{type:String,required:true}
})
export default  mongoose.model('Websites',websitesSchema)