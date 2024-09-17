import mongoose from 'mongoose';
import Profile from '../models/profile.model.js';
import activeProfile from '../profileMngr.js'
import xlsx from 'xlsx';
import fs from 'fs'
import websitesModel from '../models/websites.model.js';
import { saveProfile, saveWebsite } from '../services/profile.service.js';
import {shareProfileFunction} from '../managers/sharingManager.js'
import {updateProfiles} from '../managers/sharingManager.js';


const booleanize = (value) => {
    return value === 'true' || value === '1' || value === 'yes';
};

export const uploadProfilesFromExcel = async (req, res) => {
    try {
        const userId = req.body.text;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const profileData = xlsx.utils.sheet_to_json(sheet);
        const profileSettings = profileData[0];
        const listWebsites = await Promise.all(profileData.slice(1).map(async (site) => {

            const website = new websitesModel({
                _id: new mongoose.Types.ObjectId(),
                name: site['Website Name'],
                url: site['Website URL'],
            });
            const savedWebsite = await saveWebsite(websiteData);
            return {
                websiteId: savedWebsite._id,
                status: site['Website Status'],
                limitedMinutes: site['Website Status'] === 'limit' ? site['Limited Minutes'] : 0,
            };
        }));
        const profile = {
            userId: new mongoose.Types.ObjectId(userId),
            profileName: profileSettings['Profile Name'],
            statusBlockedSites: profileSettings['Status Blocked Sites'],
            listWebsites,
            timeProfile: {
                start: profileSettings['Start Time'],
                end: profileSettings['End Time'],
            },
            googleMapsLocation: {
                enabled: booleanize(profileSettings['Google Maps Enabled']),
                location: {
                    address: profileSettings['Google Maps Address'],
                    lat: profileSettings['Google Maps Latitude'],
                    lng: profileSettings['Google Maps Longitude'],
                },
            },
            googleCalendarEvents: {
                enabled: booleanize(profileSettings['Google Calendar Enabled']),
                calendarId: profileSettings['Google Calendar ID'],
            },
            googleDriveFiles: {
                enabled: booleanize(profileSettings['Google Drive Enabled']),
                folderId: profileSettings['Google Drive Folder ID'],
            },
        };
        const savedProfile = await saveProfile(profile);
        res.status(201).json(savedProfile);
        fs.unlinkSync(filePath);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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
        const profiles = await Profiles.find().populate('limitedWebsites.websiteId').select('-__v');
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
        const profile = await Profiles.findById(req.params.id).populate('limitedWebsites.websiteId ').select('-__v');
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
    activeProfileByUserId,
    uploadProfilesFromExcel,
};
