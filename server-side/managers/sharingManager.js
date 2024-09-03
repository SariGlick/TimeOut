import Users from '../models/user.model.js';
import PendingUsers from '../models/pendingUser.model.js';
import { createInvitation_service} from '../services/invitation.service.js';
import { createPendingUser_service } from '../services/pendingUser.service.js';


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
