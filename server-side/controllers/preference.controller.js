import  mongoose from 'mongoose';
import  Preference from '../models/preference.model.js';

export const getAllPreference=async(req,res,next)=>{
     try {
        const allPreferences=await  Preference.find().select('-__v');
        return res.send(allPreferences);
     } catch (error) {
      return next({message:error.message,status:500})
     }
};
export const getPreferenceById=async(req,res,next)=>{
    const id= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        return  next({message:'id is not valid'});

        try {
            const PreferencesById= await Preference.findById(id,{__v:false});
            res.json(PreferencesById);
        } catch (error) {
            return next({message:error.message,status:500});
        }
};

export const updatePreference=async(req,res,next)=>{
     const id= req.params.id;
     if(req.file)
       req.body.soundVoice=req.file.originalname;
     if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id isnot valid'});
        try {
            const newPreferenc= await Preference.findByIdAndUpdate(id,req.body,{new:true});
             if(!newPreferenc)
                return next({message:'Preferencs not found !!',status:404});
            return res.json(newPreferenc);
        } catch (error) {
           return next({message:error,status:500});
        }
};

export const addPreference=async(req,res,next)=>{
  try {
     req.body.soundVoice=req.file.originalname;
     const newPreferenc= new Preference(req.body);
     await  newPreferenc.save();
     return res.json(newPreferenc).status(201);
  } catch (error) {
    return next({message:error.message,status:500});
  }
}

export const deletePreference=async(req,res,next)=>{

    const id= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id isnot valid'})
    try { 
       
         const PreferenceForDelet=await Preference.findByIdAndDelete(id);
         if(!PreferenceForDelet)
            return next({message:'Preferencs not found !!'})
       
        res.json({message:'deleted succesfully!!'}).status(204)
        } catch (error) {
        return next({message:error.message,status:500});
 }
};
