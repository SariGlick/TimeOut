import mongoose from 'mongoose';
import {
    createInvitation_service,
    getAllInvitations_service,
    getInvitationById_service,
    updateInvitation_service,
    deleteInvitation_service
} from '../services/invitation.service.js'

export const getAllInvitations = async (req, res, next) => {
    try {
        const invitations = await getAllInvitations_service();
        return res.status(200).json(invitations);
    } catch (err) {
        return next({ message: err.message, status: 500 });
    }
};

export const getInvitationById = async (req, res, next) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const invitation = await getInvitationById_service(id);
        if (!invitation) {
            return next({ message: 'Invitation was not found ', status: 404 });
        }
        return res.status(200).json(invitation);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const createInvitation = async (req, res, next) => {
    
    try {
        const newInvitation = await createInvitation_service(req.body);
        res.status(201).json(newInvitation);
    } catch (err) {
        return next({ message: err.message, status: 500 });
    }
};

export const updateInvitation = async (req, res, next) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const updatedInvitation = await updateInvitation_service(id, req.body);
        if (!updatedInvitation) {
            return next({ message: 'Invitation not found', status: 404 });
        }
        res.status(200).json(updatedInvitation);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const deleteInvitation = async (req, res, next) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const deletedInvitation = await deleteInvitation_service(id);
        if (!deletedInvitation) {
            return next({ message: 'Invitation not found', status: 404 });
        }
        res.status(204).json({ message: 'Invitation deleted successfully' });
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};
