import { SELECT_OPTIONS ,VALIDATE_MESSAGES } from '../constants/profileConstants.js';
export const formatProfileData = (profile) => {
    return {
        id: profile._id,
        userId: profile.userId,
        profileName: profile.profileName || '',
        timeProfile: {
            timeStart: profile?.timeProfile?.start || '00:00',
            timeEnd: profile?.timeProfile?.end || '00:00'
        },
        statusBlockedSites: profile.statusBlockedSites || 'black list',
        websites: profile.listWebsites.map((website, index) => ({
            index: index,
            websiteId: website.websiteId._id,
            name: website.websiteId.name,
            url: website.websiteId.url,
            status: website.status || 'open',
            limitedMinutes: website.limitedMinutes || 0
        }))
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


export function validateProfileDate(formData) {
    let isValid = true;

    if (!formData.timeProfile.timeStart.trim()) {
        isValid = false;
    }

    if (!formData.timeProfile.timeEnd.trim()) {
        isValid = false;
    }

    return isValid;
}
export const validateName = (inputValue) => {
    if (inputValue.length < 2) {
        return VALIDATE_MESSAGES.PROFILE_NAME_SHORT;
    } else if (inputValue.length > 50) {
        return VALIDATE_MESSAGES.PROFILE_NAME_LONG;
    }
    return '';
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
