import Profiles from '../models/profile.js';
import Websites from '../models/website.js';

export const getAllProfiles = async () => {
    return await Profiles.find();
};

export const getProfileById = async (id) => {
    return await Profiles.findById(id).populate({
        path: 'listWebsites.websiteId',
        model: 'Websites'
    });
};

export const createProfile = async (profileData) => {
    const profile = new Profiles(profileData);
    return await profile.save();
};

export const updateProfile = async (id, profileData) => {
    return await Profiles.findByIdAndUpdate(id, profileData, { new: true }).populate({
        path: 'listWebsites.websiteId',
        model: 'Websites'
    });
};

export const deleteProfile = async (id) => {
    const profile = await Profiles.findById(id).populate({
        path: 'listWebsites.websiteId',
        model: 'Websites'
    });

    if (!profile) {
        throw new Error('Profile not found');
    }
    const websiteIds = profile.listWebsites.map(website => website.websiteId._id);
    await Websites.deleteMany({ _id: { $in: websiteIds } });

    return await Profiles.findByIdAndDelete(id);
};

export const getProfilesByUserId = async (userId) => {
    return await Profiles.find({ userId: userId }).populate({
        path: 'listWebsites.websiteId',
        model: 'Websites'
    });
};
