import Profile from '../models/profileModel.js';



   export const  getAllProfiles= async (req, res) => {
        try {
            const profiles = await Profile.find();
            res.json(profiles);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    export const createProfile= async (req, res) => {
        const newProfile = new Profile(req.body);
        try {
            const savedProfile = await newProfile.save();
            res.status(201).json(savedProfile);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

   export const   getProfileById= async (req, res) => {
        try {
            const profile = await Profile.findById(req.params.id);
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.json(profile);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    export const updateProfile=  async (req, res) => {
        try {
            const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            res.json(updatedProfile);
        } catch (err) {
            res.status(400).json({ message: err.message });
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
            res.status(500).json({ message: err.message });
        }
    };



export default profileController;