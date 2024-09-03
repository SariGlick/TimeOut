import Profile from '../models/profile.model.js';
import activeProfile from '../profileMngr.js'

export const updateUserLocation = async (userId, location) => {
  try {
    const profiles = await Profile.find({ userId });

    if (!profiles.length) {
      console.warn(`No profiles found for userId: ${userId}`);
      return 'No profiles found for user';
    }

    for (const profile of profiles) {
      if (profile.googleMapsLocation && profile.googleMapsLocation.enabled) {
        const profileLocation = profile.googleMapsLocation.location;
        if (profileLocation && profileLocation.lat && profileLocation.lng) {
          const distance = getDistance(location, profileLocation);
          if (distance < 100) {
            await activeProfile(profile.userId);
          }
        } else {
          console.warn(`Invalid location data for profile ID ${profile._id}`);
        }
      }
    }
    return 'Location updated';
  } catch (error) {
    console.error('Error in updateUserLocation:', error);
    throw error;
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
