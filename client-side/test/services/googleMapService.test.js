import startLocationTracking from '../../src/services/googleMapService';
import { handlePost } from '../../src/axios/middleware';

jest.mock('../../src/axios/middleware', () => ({
  handlePost: jest.fn(),
}));

describe('startLocationTracking', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.console.error = jest.fn();
    global.console.warn = jest.fn();
  });

  it('should handle location tracking with accurate position', (done) => {
    const mockWatchPosition = jest.fn((successCallback) => {
      successCallback({
        coords: {
          latitude: 50,
          longitude: 10,
          accuracy: 10,
        },
      });
    });

    global.navigator.geolocation = {
      watchPosition: mockWatchPosition,
    };

    handlePost.mockResolvedValue({
      data: { success: true },
    });

    startLocationTracking();

    setTimeout(() => {
      try {
        expect(handlePost).toHaveBeenCalledWith('/profiles/updateLocation', {
          userId: '6698da056e5c07ebd3c11ec1',
          location: { latitude: 50, longitude: 10 },
        });
        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should handle location tracking with inaccurate position', (done) => {
    const mockWatchPosition = jest.fn((successCallback) => {
      successCallback({
        coords: {
          latitude: 50,
          longitude: 10,
          accuracy: 30,
        },
      });
    });

    global.navigator.geolocation = {
      watchPosition: mockWatchPosition,
    };

    handlePost.mockResolvedValue({
      data: { success: true },
    });

    startLocationTracking();

    setTimeout(() => {
      try {
        expect(handlePost).not.toHaveBeenCalled();
        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should handle errors in sendLocationToServer', (done) => {
    const mockWatchPosition = jest.fn((successCallback) => {
      successCallback({
        coords: {
          latitude: 50,
          longitude: 10,
          accuracy: 10,
        },
      });
    });

    global.navigator.geolocation = {
      watchPosition: mockWatchPosition,
    };

    handlePost.mockRejectedValue(new Error('Network error'));

    startLocationTracking();

    setTimeout(() => {
      try {
        expect(console.error).toHaveBeenCalledWith('Error in location handling:', expect.any(Error));
        done();
      } catch (error) {
        done(error);
      }
    }, 0);
  });

  it('should handle geolocation not supported by the browser', () => {

    global.navigator.geolocation = undefined;

    startLocationTracking();

    expect(console.error).toHaveBeenCalledWith('Geolocation is not supported by your browser');
  });
});
