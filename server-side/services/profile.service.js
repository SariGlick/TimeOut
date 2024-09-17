import Profile from '../models/profile.model.js';
import websitesModel from '../models/websites.model.js';

export const saveProfile = async (profileData) => {
    const newProfile = new Profile(profileData);
    await newProfile.validate(); 
    return await newProfile.save();
};

export const saveWebsite = async (websiteData) => {
    const website = new websitesModel(websiteData);
    await website.validate(); 
    return await website.save();
};

export const getProfileById_service = async (id) => {
    return await Profiles.findById(id).populate('limitedWebsites.websiteId blockedSites').select('-__v');
}

export const createProfile_service = async (profileData) => {
    try {
        const newProfile = new Profiles(profileData);
        await newProfile.validate();
        await newProfile.save();
        return newProfile;
    } catch (error) {
        throw { message: 'Profile validation failed. Please check the profile data.', status: 500 };
    }
}
