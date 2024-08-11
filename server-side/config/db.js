
import  mongoose from 'mongoose';

export  const connectMongo=()=>{
mongoose.connect("mongodb+srv://sh3000444:EuACQK5n92JI3vn4@cluster0.2ttcjcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log('mongo db connected'))
.catch(err=>console.log(err.message));
}
