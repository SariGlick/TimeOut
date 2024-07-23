import  mongoose from 'mongoose';
import  Websites from  '../models/websites.model.js';

export const getAllWebsites=async(req,res,next)=>{
    try {
     const allWebSites= await Websites.find().select('-__v');
     return res.json(allWebSites);
    } catch (error) {
        next({message:error.message,status:500});
    }
   
}
export const getWebsiteById=async(req,res,next)=>{
      const id= req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id is not valid!'})
    try {
        const websitesBYId= await Websites.findById(id,{__v:false});
    return res.json(websitesBYId);

    } catch (error) {
       return  next({message:error.message,status:500});
    }
    
}
export const UpdateWebSite=async(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id is not valid'});
    try {
        const newWebsite=await Websites.findByIdAndUpdate(id, req.body,{new:true})
        if(!newWebsite)
            return next({message:'websites is not found !!'})
         return res.json(newWebsite).status(201);
    } catch (error) {
        return next({message:error.message,status:500});
    }
}

export const addWebSite=async(req,res,next)=>{
    try {
        const newWebsite= new Websites(req.body);
        await newWebsite.validate();
        await newWebsite.save();
        return res.json(newWebsite).status(201);
      
    } catch (error) {
       return  next({message:error.message,status:500});
    }
   
};
export const deleteWebsite=async(req,res,next)=>{
   const id= req.params.id;
   if(!mongoose.Types.ObjectId.isValid(id))
      return next({message:'id is not valid'})
    try {
        const deletedWebsite= await Websites.findByIdAndDelete(id);
    if(!deletedWebsite)
        return next({message:'website not found'});
    return res.status(204).json({message:'website deleted succesfully'});
    } catch (error) {
        return next({message: error.message,status:500});
    } 
    
}
