import * as profileService from '../services/profileService.js';

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await profileService.getProfileById(req.params.id);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProfile = async (req, res) => {
    try {
        const profile = await profileService.createProfile(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await profileService.updateProfile(req.params.id, req.body);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        await profileService.deleteProfile(req.params.id);
        res.status(204).json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
