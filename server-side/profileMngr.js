import { getUserById } from './controllers/user.controller.js';

function getcurrentTime(timeZone, date) {
    const options = {
        timeZone: timeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleString('en-US', options);
}

export default async function activeProfile(userId) {

    try {
        const user = await getUserById(userId);
        const currentTime = getcurrentTime(user.preferences.timeZone, new Date());
        const activeProfile = user.profiles.filter((item) => item.listWebsites.filter((website) => {
            return website.limitedTimes.some((item) => {
                return getcurrentTime(user.preferences.timeZone, item.start) <= currentTime &&
                    getcurrentTime(user.preferences.timeZone, item.end) >= currentTime;
            })
        }))
        return activeProfile
    }
    catch (error) {
        throw error
    }
}
