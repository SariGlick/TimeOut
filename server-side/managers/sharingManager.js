import { getInvitationById_service } from '../services/invitation.service.js';
import { getUserById_service } from '../services/user.service.js';
import { getProfileById_service, createProfile_service} from '../services/profile.service.js';
import { ShareLevels } from '../constants.js';

export const updateProfiles = async (invitationID) => {
    const invitation = await getInvitationById_service(invitationID);
    if (!invitation) {
        throw new Error('Invitation not found');
    }
    const { shareLevel, profileID, invitedUserID } = invitation;
    const user = await getUserById_service(invitedUserID);
    
    switch (shareLevel) {
        case ShareLevels.DUPLICATE:
            const profileToDuplicate = await getProfileById_service(profileID);
            const newProfile = await createProfile_service({
                profileName: profileToDuplicate.profileName,
                statusBlockedSites: profileToDuplicate.statusBlockedSites,
                listWebsites: profileToDuplicate.listWebsites,
            });
            await newProfile.save();
            user.profiles.push(newProfile._id);
            await user.save();
            return newProfile;
        
        case ShareLevels.VIEW:
            if (user.viewProfiles.includes(profileID)) {
                throw new Error('Profile already shared with the user');
            } else {
                user.viewProfiles.push(profileID);
                await user.save();
                return user;
            }
        
        case ShareLevels.VIEW_EDIT:
            if (user.profiles.some(profile => profile.id == profileID)) {
                throw new Error('Profile already shared with the user');
            } else {
                user.profiles.push(profileID);
                await user.save();
                return user;
            }
        
        default:
            throw new Error('Invalid share level');
    }
};
