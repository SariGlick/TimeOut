import mongoose  from 'mongoose';
import Profiles from '../models/profile.model.js';
import {shareProfileFunction} from '../managers/sharingManager.js'
import {updateProfiles} from '../managers/sharingManager.js';
import {
    getProfileById_service,
} from '../services/profile.service.js';

export const updateProfilesByInvitation = async (req, res, next) => {
    const invitationID = req.params.id;    
    if (!mongoose.Types.ObjectId.isValid(invitationID)) {
        return next({ message: 'Invitation ID is not valid', status: 400 });
    }
    try {
        const updatedProfiles = await updateProfiles(invitationID);
        if (!updatedProfiles) {
            return next({ message: 'Profiles update failed', status: 500 });
        }
        return res.json({ message: 'Profiles updated successfully based on invitation', profiles: updatedProfiles }).status(200);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const shareProfile = async (req, res, next) => {
    const { inviterID, email, profileID, shareLevel } = req.body;

    try {
        const result = await shareProfileFunction(inviterID, email, profileID, shareLevel, next);
        res.status(201).json(result);
    } catch (error) {
        next({ message: error.message, status: 500 });
    }
};

export const getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profiles.find().populate('limitedWebsites.websiteId blockedSites').select('-__v');
        res.json(profiles);
    } catch (err) {
        next({message:err.message,status:500})
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
        const profile = await getProfileById_service(id);
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