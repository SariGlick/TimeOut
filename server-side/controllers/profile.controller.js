import mongoose  from 'mongoose';
import Profiles from '../models/profile.model.js';

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profiles.find().populate('limitedWebsites.websiteId').select('-__v');
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

// export const createProfile = async (req, res) => {
//     const newProfile = new Profiles(req.body);
//     try {
//         const savedProfile = await newProfile.save();
//         res.status(201).json(savedProfile);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// export const getProfileById = async (req, res) => {
//     try {
//         const profile = await Profiles.findById(req.params.id).populate('limitedWebsites.websiteId');;
//         if (!profile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }
//         res.json(profile);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const updatedProfile = await Profiles.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProfile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }
//         res.json(updatedProfile);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// export const deleteProfile = async (req, res) => {
//     try {
//         const deletedProfile = await Profiles.findByIdAndDelete(req.params.id);
//         if (!deletedProfile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }
//         res.json({ message: 'Profile deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };




