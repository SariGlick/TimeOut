import express from 'express';
import { getAllInvitations, createInvitation, getInvitationById, updateInvitation, deleteInvitation } from '../controllers/invitation.controler.js';
import upload from '../middleware/uploadFiles.js';

const invitationsRouter = express.Router();

invitationsRouter.get('/', getAllInvitations);
invitationsRouter.get('/:id', getInvitationById);
invitationsRouter.post('/', upload.single('profileImage'), createInvitation);
invitationsRouter.put('/:id', upload.single('profileImage'), updateInvitation);
invitationsRouter.delete('/:id', deleteInvitation);

export default invitationsRouter;
