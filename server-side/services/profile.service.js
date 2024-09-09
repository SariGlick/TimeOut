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
