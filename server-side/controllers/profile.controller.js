import mongoose from 'mongoose';
import Profiles from '../models/profile.model.js';
import { shareProfileFunction } from '../managers/sharingManager.js'
import { updateProfiles } from '../managers/sharingManager.js';

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
        return res.status(500).json({ message: err.message });
    }
};

export const createProfile = async (req, res) => {
    const newProfile = new Profiles(req.body);
    try {
        const savedProfile = await newProfile.save();
        res.status(200).json(savedProfile);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profiles.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        return res.json(profile);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profiles.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        return res.json(updatedProfile);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const getProfilesByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const profiles = await Profiles.find({ userId: userId }).populate({
            path: 'listWebsites.websiteId',
            model: 'Websites'
        });
        if (!profiles.length) {
            return res.status(404).json({ message: 'No profiles found for this user' });
        }
        res.json(profiles);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const deletedProfile = await Profiles.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        return res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export async function updateLocation(req, res) {
    const { userId, location } = req.body;
    try {
        await updateUserLocation(userId, location);
        res.status(200).json({ message: 'Location updated and profiles checked' });
    } catch (error) {
        console.error('Error updating location:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const activeProfileByUserId = async (req, res) => {
    try {
        const userId = req.body;
        const profile = await activeProfile(userId);
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
export default {
    getAllProfiles,
    createProfile,
    getProfileById,
    updateProfile,
    getProfilesByUserId,
    deleteProfile,
    activeProfileByUserId
};
