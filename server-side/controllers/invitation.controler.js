import mongoose from 'mongoose';
import Invitations from '../models/invitation.model.js';

export const getAllInvitations = async (req, res, next) => {
    try {
        const invitations = await Invitations.find().populate('inviterID invitedUserID profileID').select('-__v');
        res.json(invitations);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const createInvitation = async (req, res, next) => {
    
    try {
        
        const newInvitation = new Invitations(req.body);
        await newInvitation.validate();
        await newInvitation.save();
        res.status(201).json(newInvitation);
    } catch (err) {
        next({ message: err.message, status: 500 });
        return;
    }
};

export const getInvitationById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const invitation = await Invitations.findById(req.params.id).populate('inviterID invitedUserID profileID').select('-__v');
        if (!invitation) {
            return next({ message: 'Invitation was not found ', status: 404 });
        }
        res.json(invitation);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const updateInvitation = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const updatedInvitation = await Invitations.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInvitation) {
            return next({ message: 'Invitation not found', status: 404 });
        }
        res.json(updatedInvitation);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const deleteInvitation = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const deletedInvitation = await Invitations.findByIdAndDelete(id);
        if (!deletedInvitation) {
            return next({ message: 'Invitation not found', status: 404 });
        }
        res.json({ message: 'Invitation deleted successfully' });
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};
