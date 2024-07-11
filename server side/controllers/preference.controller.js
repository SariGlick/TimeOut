import  mongoose from 'mongoose';
import  {Preferenec}from '../models/preference.model.js';

export const getAllPreferenecs=async(req,res,next)=>{
     try {
        const allPreferenecs=await  Preferenec.find().select('-__v');
        return res.send(allPreferenecs);
     } catch (error) {
      return next({message:error.message})
     }
};
export const getPreferenecById=async(req,res,next)=>{
    const id= req.params.id;
    if(mongoose.Types.ObjectId.isValid(id))
    {
        try {
            const preferenecsById= await Preferenec.findById(id,{__v:false});
            res.json(preferenecsById);
        } catch (error) {
            return next({message:error.message})
        }
    }
    else{
        next({message:'id is not valid'});
    }
    

}

export const updatePreferenec=async(req,res,next)=>{
     const id= req.params.id;
     if(req.file)
       req.body.soundVoice=req.file.originalname;
     if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id isnot valid'});
        try {
             const updatedPreferenec=await  Preferenec.findById(id);
             if(!updatedPreferenec)
                return next({message:'Preferencs not found !!',status:404});
            const newPreferenc= await Preferenec.findByIdAndUpdate(id,req.body,{new:true});
            return res.json(newPreferenc);
        } catch (error) {
            next({message:error})
        }
};

export const addPreferenec=async(req,res,next)=>{
  try {
     req.body.soundVoice=req.file.originalname;
     const newPreferenc= new Preferenec(req.body);
     await  newPreferenc.save();
     return res.json(newPreferenc).status(201);
  } catch (error) {
    return next({message:error.message})
  }
};


export const deletePreferenec=async(req,res,next)=>{

    const id= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id isnot valid'})
    try { 
       
         const preferenecForDelet=await Preferenec.findById(id);
         if(!preferenecForDelet)
            return next({message:'Preferencs not found !!'})
        await Preferenec.findByIdAndDelete(id);
        res.status(204).send();
        } catch (error) {
        return next({message:error.message});
    }
};
