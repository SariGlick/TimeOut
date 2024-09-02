import Profiles from "../models/profile.model.js";

export const getProfileById_service = async (id) => {
    return await Profiles.findById(id).populate('limitedWebsites.websiteId blockedSites').select('-__v');
}

export const createProfile_service = async (profileData) => {
    const newprofile = new Profiles(profileData);
    await newprofile.validate();
    await newprofile.save();
    return newprofile;
}