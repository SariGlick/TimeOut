<<<<<<< HEAD
import  mongoose from 'mongoose';
import  Preference from '../models/preference.model.js';

export const getAllPreference=async(req,res,next)=>{
     try {
        const allPreferences=await  Preference.find().select('-__v');
        return res.send(allPreferences);
     } catch (error) {
      return next({message:error.message})
     }
};
export const getPreferenceById=async(req,res,next)=>{
    const id= req.params.id;
    if(mongoose.Types.ObjectId.isValid(id))
    {
        try {
            const PreferencesById= await Preference.findById(id,{__v:false});
            res.json(PreferencesById);
        } catch (error) {
            return next({message:error.message})
        }
    }
    else{
        next({message:'id is not valid'});
    }
    

};

export const updatePreference=async(req,res,next)=>{
     const id= req.params.id;
     if(req.file)
       req.body.soundVoice=req.file.originalname;
     if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id isnot valid'});
        try {
             const updatedPreference=await  Preference.findById(id);
             if(!updatedPreference)
                return next({message:'Preferencs not found !!',status:404});
            const newPreferenc= await Preference.findByIdAndUpdate(id,req.body,{new:true});
            return res.json(newPreferenc);
        } catch (error) {
            next({message:error})
        }
};

export const addPreference=async(req,res,next)=>{
  try {
     req.body.soundVoice=req.file.originalname;
     const newPreferenc= new Preference(req.body);
     await  newPreferenc.save();
     return res.json(newPreferenc).status(201);
  } catch (error) {
    return next({message:error.message})
  }
};

export const deletePreference=async(req,res,next)=>{

    const id= req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id isnot valid'})
    try { 
       
         const PreferenceForDelet=await Preference.findById(id);
         if(!PreferenceForDelet)
            return next({message:'Preferencs not found !!'})
        await Preference.findByIdAndDelete(id);
        res.status(204).send();
        } catch (error) {
        return next({message:error.message});
=======
import mongoose from 'mongoose';
import Preference from '../models/preference.model.js';

export const getAllPreference = async (req, res, next) => {
    try {
        const allPreferences = await Preference.find().select('-__v');
        return res.send(allPreferences);
    } catch (error) {
        return next({ message: error.message, status: 500 })
    }
};
export const getPreferenceById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid' });

    try {
        const PreferencesById = await Preference.findById(id, { __v: false });
        res.json(PreferencesById);
    } catch (error) {
        return next({ message: error.message, status: 500 });
    }
};

export const updatePreference = async (req, res, next) => {
    const id = req.params.id;
    if (req.file)
        req.body.soundVoice = req.file.originalname;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id isnot valid' });
    try {
        const newPreference = await Preference.findByIdAndUpdate(id, req.body, { new: true });
        if (!newPreference)
            return next({ message: 'Preferencs not found !!', status: 404 });
        return res.json(newPreference);
    } catch (error) {
        return next({ message: error, status: 500 });
    }
};

export const addPreference = async (req, res, next) => {
    try {
        if (req.file)
            req.body.soundVoice = req.file.originalname;
        const newPreference = new Preference(req.body);
        await newPreference.validate();
        await newPreference.save();
        return res.json(newPreference).status(201);
    } catch (error) {
        return next({ message: error.message, status: 500 });
    }
}

export const deletePreference = async (req, res, next) => {

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id isnot valid' })
    try {

        const PreferenceForDelet = await Preference.findByIdAndDelete(id);
        if (!PreferenceForDelet)
            return next({ message: 'Preferencs not found !!' })

        res.json({ message: 'deleted succesfully!!' }).status(204)
    } catch (error) {
        return next({ message: error.message, status: 500 });
>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
    }
};
