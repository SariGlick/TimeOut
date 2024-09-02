import Profile from '../models/profile.model.js';
import activeProfile from '../profileMngr.js'

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
        res.json(profile);
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
        res.json(updatedProfile);
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
        res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const updateLocation = async (req, res) => {
    const { userId, location } = req.body;
    try {
        const profiles = await Profile.find({ userId });

        if (!profiles.length) {
            return res.status(404).send('No profiles found for user');
        }
        for (const profile of profiles) {
            if (profile.googleMapsLocation && profile.googleMapsLocation.enabled) {
                const profileLocation = profile.googleMapsLocation.location;
                if (profileLocation && profileLocation.lat && profileLocation.lng) {
                    const distance = getDistance(location, profileLocation);

                    if (distance < 100) {
                        await activateProfile(profile.userId);
                    }
                } else {
                    console.warn(`Invalid location data for profile ID ${profile._id}`);
                }
            }
        }

        res.send('Location updated');
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
};

const getDistance = (loc1, loc2) => {
    const toRad = (value) => value * Math.PI / 180;

    const R = 6371;
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLon = toRad(loc2.lng - loc1.lng);
    const lat1 = toRad(loc1.lat);
    const lat2 = toRad(loc2.lat);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
        Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.asin(Math.sqrt(a));
    const distance = R * c * 1000;
    
    return distance;
};
export const activeProfileByUserId = async(req, res) => {
    try {
        const userId = req.body;
        const profile = await activeProfile(userId);
        
        res.status(201).json(profile);
    }
    catch (error) {
        console.log({ error })
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
