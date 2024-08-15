import {
    formatProfileData,
    updateFormDataWithStatusBlockedSites,
    getStatusOptions,
    extractWebsiteName,
    validateName,
    isValidURL,
    isWebsiteInProfile,
    handleFieldChange,
    validateProfileDate
} from '../../src/utils/profileUtil.js';
import { SELECT_OPTIONS, VALIDATE_MESSAGES } from '../../src/constants/profileConstants.js';

describe('formatProfileData', () => {
    test('formats profile data correctly', () => {
        const profile = {
            _id: '123',
            userId: 'user1',
            profileName: 'Test Profile',
            timeProfile: { start: '08:00', end: '17:00' },
            statusBlockedSites: 'white list',
            listWebsites: [
                {
                    websiteId: { _id: 'web1', name: 'Example', url: 'http://example.com' },
                    status: 'limit',
                    limitedMinutes: 30
                }
            ]
        };

        const formattedData = formatProfileData(profile);

        expect(formattedData).toEqual({
            id: '123',
            userId: 'user1',
            profileName: 'Test Profile',
            timeProfile: { timeStart: '08:00', timeEnd: '17:00' },
            statusBlockedSites: 'white list',
            websites: [{
                index: 0,
                websiteId: 'web1',
                name: 'Example',
                url: 'http://example.com',
                status: 'limit',
                limitedMinutes: 30
            }]
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
    test('returns short message for name shorter than 2 characters', () => {
        expect(validateName('A')).toBe(VALIDATE_MESSAGES.PROFILE_NAME_SHORT);
    });

    test('returns long message for name longer than 50 characters', () => {
        expect(validateName('A'.repeat(51))).toBe(VALIDATE_MESSAGES.PROFILE_NAME_LONG);
    });

    test('returns empty string for valid name length', () => {
        expect(validateName('Valid Name')).toBe('');
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
