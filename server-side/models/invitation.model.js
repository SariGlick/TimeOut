import mongoose,{Schema} from 'mongoose';

const InvitationsSchema = new mongoose.Schema({
    invitedUserID: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    profileID: { type: Schema.Types.ObjectId, ref: 'Profiles', required: true },
    shareLevel: { type: String, enum: ['duplicate', 'view', 'view & edit'], required: true }
});

export default mongoose.model('Invitations', InvitationsSchema);

