import Users from '../models/user.model.js';
import PendingUsers from '../models/pendingUser.model.js';
import { createInvitation_service} from '../services/invitation.service.js';
import { createPendingUser_service } from '../services/pendingUser.service.js';
import { getInvitationById_service } from '../services/invitation.service.js';
import { getUserById_service } from '../services/user.service.js';
import { getProfileById_service, createProfile_service} from '../services/profile.service.js';
import { ShareLevels } from '../constant.js';

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

export const shareProfileFunction = async (inviterID, email, profileID, shareLevel, next) => {
    try {
        const invitedUser = await getInvitedUserID(email, next);

        const date = new Date().toISOString().split('T')[0]; //to get the date in YYYY-MM-DD format
        
        const newInvitation = {
            inviterID,
            invitedUserID: invitedUser.userID,
            invitedUserType: invitedUser.inCollection,
            profileID,
            shareLevel,
            date
        };
        
        const invitation = await createInvitation_service(newInvitation);
        return invitation; 
        
    } catch (error) {
        return next({ message: error.message, status: 500 });
    }
};

const getInvitedUserID = async(email, next) => {
    try {
        let user = await Users.findOne({email});
        if(user){
            return {userID: user._id, inCollection: 'Users'};
        }

        user = await PendingUsers.findOne({email});
        if(!user){
            user = await createPendingUser_service( {email} );
        }
        
        return {userID: user._id, inCollection:'PendingUsers'};
        
    } catch (error) {
        return next({ message: error.message, status: 500});
    }
};
