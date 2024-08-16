import Users from '../models/user.model';
import PendingUsers from '../models/pendingUser.model';
import { createPendingUser } from '../controllers/pendingUser.controler';
import { createInvitation } from '../controllers/invitation.controler';

export const shareProfile = async (req, res, next) => {
    try {
        const { inviterID, email, profileID, shareLevel } = req.body;
        
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
        
        const invitation = await createInvitation(newInvitation);
        res.status(201).json(invitation); 
        
    } catch (error) {
        next({ message: error.message, status: 500 });
    }
};

const getInvitedUserID = async(email)=>{
    try {
        let user = await Users.findOne({email});
        if(user){
            return {userID: user._id, inCollection: 'Users'};
        }

        user = await PendingUsers.findOne({email});
        if(!user){
            user = await createPendingUser( {email} );
        }
        
        return {userID: user._id, inCollection:'PendingUsers'};
        
    } catch (error) {
        next({ message: error.message, status: 500});
    }
};
