import mongoose  from 'mongoose';
import Profiles from '../models/profile.model.js';
<<<<<<< HEAD
<<<<<<< HEAD

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profiles.find().populate('limitedWebsites.websiteId').select('-__v');
=======
import activeProfile from '../profileMngr.js'
=======

>>>>>>> e1846fe75f6d92f5dfa7a440988cb38473a34797

export const getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profiles.find().populate('limitedWebsites.websiteId blockedSites').select('-__v');
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createProfile = async (req, res, next) => {
    try {
        const newProfile = new Profiles(req.body);
        await newProfile.validate();
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (err) {
        next({message:err.message,status:500})
        return;
    }
};

export const getProfileById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const profile = await Profiles.findById(req.params.id).populate('limitedWebsites.websiteId blockedSites').select('-__v');
        if (!profile) {
          return  next({message:'profile was not found ',status:404}); 
        }
        res.json(profile);
    } catch (err) {
        next({message:err.message,status:500})
    }
};



export const updateProfile = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const updatedProfile = await Profiles.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProfile) {
            return next({message:'profile not found',status:404})
        }
        res.json(updatedProfile);
    } catch (err) {
        next({message:err.message,status:500});
    }
};

 

export const deleteProfile = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const deletedProfile = await Profiles.findByIdAndDelete(id);
        if (!deletedProfile) {
            return next({message:'profile not found',status:404});
        }
        res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
         next({message:err.message,status:500});
    }
};
<<<<<<< HEAD
=======




>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
