import Profile from '../models/profile.model.js';
import activeProfile from '../profileMngr.js'
import  {updateUserLocation}  from '../services/googleMapService.js';

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const createProfile = async (req, res) => {
    const newProfile = new Profile(req.body);
    try {
        const savedProfile = await newProfile.save();
        res.status(200).json(savedProfile);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
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
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const profiles = await Profile.find({ userId: userId }).populate({
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
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
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
  }

export const activeProfileByUserId = async(req, res) => {
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
    updateLocation,
    activeProfileByUserId
};
