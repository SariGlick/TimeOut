import Invitations from "../models/invitation.model.js";

export const getAllInvitations_service = async () => {
    return await Invitations.find().select('-__v'); 
}

export const getInvitationById_service = async (id) => {
    return await Invitations.findById(id).select('-__v');
}

export const createInvitation_service = async (invitationData) => {
    const newInvitation = new Invitations(invitationData);
    await newInvitation.validate();
    await newInvitation.save();
    return newInvitation;
}

export const updateInvitation_service = async (id,updateData) => {
    return await Invitations.findByIdAndUpdate(id, updateData, { new: true });
}

export const deleteInvitation_service = async (id) => {
    return await Invitations.findByIdAndDelete(id);
}



