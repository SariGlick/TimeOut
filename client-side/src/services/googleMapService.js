import { handlePost } from '../axios/middleware.js';

const startLocationTracking = () => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
    return;
  }
  navigator.geolocation.watchPosition(
    async (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      if (accuracy <= 20) {
        try {
          await sendLocationToServer(latitude, longitude);
        } catch (error) {
          console.error('Error in location handling:', error);
        }
      } else {
        console.warn('Location accuracy is too low, waiting for a better fix');
      }
    },
    (error) => {
      console.error('Location error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000, 
      maximumAge: 0, 
    }
  );
};
const sendLocationToServer = async (latitude, longitude) => {
  try {
    const response = await handlePost('/profiles/updateLocation', {
      userId: '6698da056e5c07ebd3c11ec1',
      location: { latitude, longitude }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending location:', error);
    throw error;
  }
};

export default startLocationTracking;
