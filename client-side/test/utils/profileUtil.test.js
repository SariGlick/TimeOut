import {
    formatProfileData,
    updateFormDataWithStatusBlockedSites,
    getStatusOptions,
    extractWebsiteName,
    validateName,
    isValidURL,
    isWebsiteInProfile,
    handleFieldChange,
    validateProfileDate,
    parseTimeStringToDate 
} from '../../src/utils/profileUtil.js';
import { SELECT_OPTIONS} from '../../src/constants/profileConstants.js';

describe('formatProfileData', () => {
  test('formats profile data correctly when all fields are provided', () => {
    const profile = {
      userId: 'user1',
      profileName: 'Test Profile',
      timeProfile: { start: '08:00', end: '17:00' },
      statusBlockedSites: 'black list',
      listWebsites: [
        {
          websiteId: { _id: 'web1', name: 'Example', url: 'http://example.com' },
          status: 'limit',
          limitedMinutes: 30
        }
      ],
      googleMapsLocation: { enabled: true, address: '123 Main St', lat: 12.34, lng: 56.78 },
      googleCalendarEvents: { enabled: true, calendarId: 'cal123' },
      googleDriveFiles: { enabled: true, folderId: 'folder123' }
    };

    const formattedData = formatProfileData(profile);

    expect(formattedData).toEqual({
      userId: 'user1',
      profileName: 'Test Profile',
      timeProfile: { timeStart: '08:00', timeEnd: '17:00' },
      statusBlockedSites: 'black list',
      websites: [
        {
          index: 0,
          websiteId: 'web1',
          name: 'Example',
          url: 'http://example.com',
          status: 'limit',
          limitedMinutes: 30
        }
      ],
      googleMapsEnabled: true,
      googleMapsLocation: {
        address: '123 Main St',
        lat: 12.34,
        lng: 56.78
      },
      googleCalendarEnabled: true,
      googleCalendarId: 'cal123',
      googleDriveEnabled: true,
      googleDriveFolderId: 'folder123'
    });
  });

  test('formats profile data correctly when some fields are missing', () => {
    const profile = {
      userId: 'user2',
      profileName: '',
      timeProfile: { start: '', end: '' },
      statusBlockedSites: 'white list',
      listWebsites: [
        {
          websiteId: { _id: 'web2', name: '', url: '' },
          status: 'open',
          limitedMinutes: 10
        }
      ],
      googleMapsLocation: { enabled: false },
      googleCalendarEvents: {},
      googleDriveFiles: { enabled: true }
    };

    const formattedData = formatProfileData(profile);

    expect(formattedData).toEqual({
      userId: 'user2',
      profileName: '',
      timeProfile: {
        timeStart: new Date().toISOString().substr(11, 5),
        timeEnd: new Date().toISOString().substr(11, 5)
      },
      statusBlockedSites: 'white list',
      websites: [
        {
          index: 0,
          websiteId: 'web2',
          name: '',
          url: '',
          status: 'open',
          limitedMinutes: 10
        }
      ],
      googleMapsEnabled: false,
      googleMapsLocation: {
        address: '',
        lat: 0,
        lng: 0
      },
      googleCalendarEnabled: false,
      googleCalendarId: '',
      googleDriveEnabled: true,
      googleDriveFolderId: ''
    });
  });

  test('formats profile data correctly when all fields are missing', () => {
    const profile = {};

    const formattedData = formatProfileData(profile);

    expect(formattedData).toEqual({
      userId: '',
      profileName: '',
      timeProfile: {
        timeStart: new Date().toISOString().substr(11, 5),
        timeEnd: new Date().toISOString().substr(11, 5)
      },
      statusBlockedSites: '',
      websites: [],
      googleMapsEnabled: false,
      googleMapsLocation: {
        address: '',
        lat: 0,
        lng: 0
      },
      googleCalendarEnabled: false,
      googleCalendarId: '',
      googleDriveEnabled: false,
      googleDriveFolderId: ''
    });
  });
});


describe('updateFormDataWithStatusBlockedSites', () => {
    test('updates form data with new statusBlockedSites value', () => {
        const formData = {
            profileName: 'Test Profile',
            timeProfile: { timeStart: '08:00', timeEnd: '17:00' },
            statusBlockedSites: 'black list',
            websites: [{ status: 'open' }]
        };

        const updatedData = updateFormDataWithStatusBlockedSites(formData, 'white list');

        expect(updatedData).toEqual({
            profileName: 'Test Profile',
            timeProfile: { timeStart: '08:00', timeEnd: '17:00' },
            statusBlockedSites: 'white list',
            websites: [{ status: 'block' }]
        });
    });
});

describe('getStatusOptions', () => {
    test('returns correct options for black list', () => {
        expect(getStatusOptions('black list')).toEqual(SELECT_OPTIONS.WEBSITE_STATUS_BLOCK);
    });

    test('returns correct options for white list', () => {
        expect(getStatusOptions('white list')).toEqual(SELECT_OPTIONS.WEBSITE_STATUS_OPEN);
    });

    test('returns empty array for unknown status type', () => {
        expect(getStatusOptions('unknown')).toEqual([]);
    });
});

describe('extractWebsiteName', () => {
    test('extracts website name from URL', () => {
        expect(extractWebsiteName('http://www.example.com')).toBe('example');
    });

    test('returns empty string for invalid URL', () => {
        expect(extractWebsiteName('invalid-url')).toBe('');
    });
});

describe('validateName', () => {
    test('returns -1 for name shorter than 2 characters', () => {
      expect(validateName('A')).toBe(-1);
    });
  
    test('returns 0 for name longer than 50 characters', () => {
      expect(validateName('A'.repeat(51))).toBe(0);
    });
  
    test('returns 1 for valid name length', () => {
      expect(validateName('Valid Name')).toBe(1);
    });
  });

describe('isValidURL', () => {
    test('returns true for valid URL', () => {
        expect(isValidURL('http://example.com')).toBe(true);
    });

    test('returns false for invalid URL', () => {
        expect(isValidURL('invalid-url')).toBe(false);
    });
});

describe('isWebsiteInProfile', () => {
    test('returns true if URL is in profile websites', () => {
        const profile = {
            listWebsites: [{ websiteId: { url: 'http://example.com' } }]
        };

        expect(isWebsiteInProfile('http://example.com', profile)).toBe(true);
    });

    test('returns false if URL is not in profile websites', () => {
        const profile = {
            listWebsites: [{ websiteId: { url: 'http://another.com' } }]
        };

        expect(isWebsiteInProfile('http://example.com', profile)).toBe(false);
    });
});

describe('handleFieldChange', () => {
    test('updates statusBlockedSites field correctly', () => {
        const setFormData = jest.fn();
        const event = { target: { name: 'statusBlockedSites', value: 'white list' } };

        handleFieldChange(event, setFormData);

        expect(setFormData).toHaveBeenCalledWith(expect.any(Function));
        const updater = setFormData.mock.calls[0][0];

        const initialFormData = {
            profileName: 'Test Profile',
            statusBlockedSites: 'black list',
            websites: [{ status: 'open' }]
        };

        const updatedFormData = updater(initialFormData);

        expect(updatedFormData.statusBlockedSites).toBe('white list');
    });
}); 

describe('handleFieldChange', () => {
    test('updates statusBlockedSites field correctly', () => {
        const setFormData = jest.fn();
        const event = { target: { name: 'statusBlockedSites', value: 'white list' } };

        handleFieldChange(event, setFormData);

        expect(setFormData).toHaveBeenCalledWith(expect.any(Function));
        const updater = setFormData.mock.calls[0][0];

        const initialFormData = {
            profileName: 'Test Profile',
            statusBlockedSites: 'black list',
            websites: [{ status: 'open' }]
        };

        const updatedFormData = updater(initialFormData);

        expect(updatedFormData.statusBlockedSites).toBe('white list');
    });
});

describe('handleFieldChange', () => {
    test('updates statusBlockedSites field correctly', () => {
        const setFormData = jest.fn();
        const event = { target: { name: 'statusBlockedSites', value: 'white list' } };

        handleFieldChange(event, setFormData);

        expect(setFormData).toHaveBeenCalledWith(expect.any(Function));
        const updater = setFormData.mock.calls[0][0];

        const initialFormData = {
            profileName: 'Test Profile',
            statusBlockedSites: 'black list',
            websites: [{ status: 'open' }]
        };

        const updatedFormData = updater(initialFormData);

        expect(updatedFormData.statusBlockedSites).toBe('white list');
    });
});


describe('validateProfileDate', () => {
    test('returns false if start time is after end time', () => {
        const formData = {
            timeProfile: {
                timeStart: '18:00',
                timeEnd: '17:00'
            }
        };
        expect(validateProfileDate(formData)).toBe(false);
    });

    test('returns true if start time is before end time', () => {
        const formData = {
            timeProfile: {
                timeStart: '08:00',
                timeEnd: '17:00'
            }
        };
        expect(validateProfileDate(formData)).toBe(true);
    });

    test('returns true if start time is the same as end time', () => {
        const formData = {
            timeProfile: {
                timeStart: '17:00',
                timeEnd: '17:00'
            }
        };
        expect(validateProfileDate(formData)).toBe(true);
    });
});

describe('parseTimeStringToDate', () => {
    test('correctly parses a valid time string', () => {
      const timeString = '13:45';
      const date = parseTimeStringToDate(timeString);
      expect(date.getHours()).toBe(13);
      expect(date.getMinutes()).toBe(45);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });
  
    test('sets the current date when parsing time string', () => {
      const timeString = '08:30';
      const date = parseTimeStringToDate(timeString);
      const now = new Date();
      expect(date.getFullYear()).toBe(now.getFullYear());
      expect(date.getMonth()).toBe(now.getMonth());
      expect(date.getDate()).toBe(now.getDate());
    });
  
    test('parses a time string with leading zeroes correctly', () => {
      const timeString = '01:05';
      const date = parseTimeStringToDate(timeString);
      expect(date.getHours()).toBe(1);
      expect(date.getMinutes()).toBe(5);
    });
  
    test('handles invalid time string format', () => {
      const timeString = 'invalid';
      const date = parseTimeStringToDate(timeString);
      expect(date.getHours()).toBeNaN();
      expect(date.getMinutes()).toBeNaN();
    });
  });
