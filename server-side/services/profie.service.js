import Profiles from '../models/profile.model.js';

export const getAllProfiles = async () => {
    try {
        const profiles = await Profiles.find();
        return profiles;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const createProfile = async (profileData) => {
    const newProfile = new Profiles(profileData);
    try {
        if(newProfile.statusBlockedSites == 'black list'){

        }
        const savedProfile = await newProfile.save();
        return savedProfile;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getProfileById = async (id) => {
    try {
        const profile = await Profiles.findById(id);
        if (!profile) {
            throw new Error('Profile not found');
        }
        return profile;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const updateProfile = async (id, updateData) => {
    try {
        const updatedProfile = await Profiles.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProfile) {
            throw new Error('Profile not found');
        }
        return updatedProfile;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const deleteProfile = async (id) => {
    try {
        const deletedProfile = await Profiles.findByIdAndDelete(id);
        if (!deletedProfile) {
            throw new Error('Profile not found');
        }
        return { message: 'Profile deleted successfully' };
    } catch (err) {
        throw new Error(err.message);
    }
};
