import  mongoose from 'mongoose';
import  {Websites} from  '../models/websites.model.js';

export const getAllWebsites=async(req,res,next)=>{
    try {
     const allWebSites= await Websites.find().select('-__v');
     return res.json(allWebSites);
    } catch (error) {
        next({message:error.message});
    }
   
}
export const getWebsitesById=async(req,res,next)=>{
      const id= req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id is not valid!'})
    try {
        const websitesBYId= await Websites.findById(id,{__v:false});
    return res.json(websitesBYId);

    } catch (error) {
       return  next({message:error.message});
    }
    
}
export const UpdateWebSites=async(req,res,next)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next({message:'id is not valid'});
    try {
        const prevWebSites=await Websites.findById(id);
        if(!prevWebSites)
            return next({message:'websites is not found !!'})
         const  newWebsite=await Websites.findByIdAndUpdate(id, req.body,{new:true})
         return res.json(newWebsite).status(201);
    } catch (error) {
        return next({message:error.message});
    }
}
export const addWebSites=async(req,res,next)=>{
    try {
        const newWebsite= new Websites(req.body);
        await newWebsite.save();
        return res.json(newWebsite).status(201);
      
    } catch (error) {
       return  next({message:error.message});
    }
   
};
export const deleteWebsites=async(req,res,next)=>{
   const id= req.params.id;
   if(mongoose.Types.ObjectId.isValid(id))
      return next({message:'id is not valid'})
    try {
        const deletedWebsite= await Websites.findById(id);
    if(!deletedWebsite)
        return next({message:'website not found'});
    await Websites.findByIdAndDelete(id);
    return res.status(204).send();
    } catch (error) {
        return next({message: error.message});
    } 
    
}
