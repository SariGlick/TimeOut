import Profiles from "../models/profile.model.js";

export const getProfileById_service = async (id) => {
	return await Profiles.findById(id).populate('limitedWebsites.websiteId blockedSites').select('-__v');
}

export const createProfile_service = async (profileData) => {
	try {
		const newProfile = new Profiles(profileData);
		await newProfile.validate();
		await newProfile.save();
		return newProfile;
	} catch (error) {
		throw { message: 'Profile validation failed. Please check the profile data.', status: 500 };
	}
}