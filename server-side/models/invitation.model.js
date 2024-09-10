import mongoose, { Schema } from 'mongoose';

const InvitationsSchema = new mongoose.Schema({
	inviterID: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	invitedUserID: {
		type: Schema.Types.ObjectId,
		refPath: 'invitedUserType',
		required: true
	},
	invitedUserType: {
		type: String,
		enum: ['Users', 'PendingUsers'],
		required: true
	},
	profileID: { type: Schema.Types.ObjectId, ref: 'Profiles', required: true },
	shareLevel: { type: String, enum: ['duplicate', 'view', 'view & edit'], required: true },
	date : {type: Date, required: true}
});

export default mongoose.model('Invitations', InvitationsSchema);