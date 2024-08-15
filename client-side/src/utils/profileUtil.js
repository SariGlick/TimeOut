import { SELECT_OPTIONS, VALIDATE_MESSAGES } from '../constants/profileConstants.js';

export const formatProfileData = (profile) => {
    return {
        userId: profile.userId || '',
        profileName: profile.profileName || '',
        timeProfile: {
            timeStart: profile?.timeProfile?.start || new Date().toISOString().substr(11, 5),
            timeEnd: profile?.timeProfile?.end || new Date().toISOString().substr(11, 5)
        },
        statusBlockedSites: profile.statusBlockedSites || '',
        websites: (profile.listWebsites || []).map((website, index) => ({
            index: index,
            websiteId: website.websiteId?._id || '',
            name: website.websiteId?.name || '',
            url: website.websiteId?.url || '',
            status: website.status || 'open',
            limitedMinutes: website.limitedMinutes || 0
        })),
        googleMapsEnabled: profile.googleMapsLocation?.enabled || false,
        googleMapsLocation: {
            address: profile.googleMapsLocation?.address || '',
            lat: profile.googleMapsLocation?.lat || 0,
            lng: profile.googleMapsLocation?.lng || 0
        },
        googleCalendarEnabled: profile.googleCalendarEvents?.enabled || false,
        googleCalendarId: profile.googleCalendarEvents?.calendarId || '',
        googleDriveEnabled: profile.googleDriveFiles?.enabled || false,
        googleDriveFolderId: profile.googleDriveFiles?.folderId || ''
    };
};

export const updateFormDataWithStatusBlockedSites = (formData, value) => {
    const updatedWebsites = formData.websites.map(website => {
        if (website.status === 'limit') {
            return website;
        }
        return {
            ...website,
            status: value === 'black list' ? 'open' : 'block'
        };
    });
    return {
        ...formData,
        statusBlockedSites: value,
        websites: updatedWebsites
    };
};

export const getStatusOptions = (statusType) => {
    switch (statusType) {
        case 'black list':
            return SELECT_OPTIONS.WEBSITE_STATUS_BLOCK;
        case 'white list':
            return SELECT_OPTIONS.WEBSITE_STATUS_OPEN;
        default:
            return [];
    }
};

export const extractWebsiteName = (url) => {
    try {
        const hostname = new URL(url).hostname;
        return hostname.replace('www.', '').split('.')[0];
    } catch {
        return '';
    }
};

export const validateName = (inputValue) => {
    if (inputValue.length < 2) {
        return -1;
    } else if (inputValue.length > 50) {
        return 0;
    }
    return 1;
};

export const isValidURL = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export const isWebsiteInProfile = (url, profile) => {
    return profile.listWebsites.some(website => website.websiteId.url === url);
};

export const handleFieldChange = (e, setFormData) => {
    const { name, checked, value, type } = e.target;

    setFormData(prevState => {
        const updatedState = { ...prevState };

        if (type === 'checkbox') {
            updatedState[name] = checked;
        } else if (name === 'profileName') {
            updatedState.profileName = value;
        } else if (name === 'statusBlockedSites') {
            return updateFormDataWithStatusBlockedSites(prevState, value);
        } else if (name === 'timeStart' || name === 'timeEnd') {
            updatedState.timeProfile = {
                ...prevState.timeProfile,
                [name]: value
            };
        } else {
            updatedState[name] = value;
        }
        return updatedState;
    });
};

export const validateProfileDate = (formData) => {
    const startTime = new Date();
    const endTime = new Date();

    const [startHours, startMinutes] = formData.timeProfile.timeStart.split(":");
    startTime.setHours(parseInt(startHours));
    startTime.setMinutes(parseInt(startMinutes));

    const [endHours, endMinutes] = formData.timeProfile.timeEnd.split(":");
    endTime.setHours(parseInt(endHours));
    endTime.setMinutes(parseInt(endMinutes));

    if (startTime > endTime) {
        return false;
    }

    return true;
};
//////////////טסט////////////////
export function parseTimeStringToDate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}
