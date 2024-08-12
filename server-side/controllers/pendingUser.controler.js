import mongoose from 'mongoose';
import PendingUsers from '../models/pendingUser.model.js';

export const getAllPendingUsers = async (req, res, next) => {
    try {
        const pendingUsers = await PendingUsers.find().select('-__v');
        res.json(pendingUsers);
    } catch (err) {
        next({ message: err.message, status: 500 });
    }
};

export const createPendingUser = async (req, res, next) => {
    console.log(req.body);
    
    try {
        const newPendingUser = new PendingUsers(req.body);
        await newPendingUser.validate();
        await newPendingUser.save();
        res.status(201).json(newPendingUser);
    } catch (err) {
        next({ message: err.message, status: 500 });
        return;
    }
};

export const getPendingUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const pendingUser = await PendingUsers.findById(id).select('-__v');
        if (!pendingUser) {
            return next({ message: 'Pending user was not found ', status: 404 });
        }
        res.json(pendingUser);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return next({ message: 'ID is not valid', status: 400 });
        }
        next({ message: err.message, status: 500 });
    }
};

export const updatePendingUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedPendingUser = await PendingUsers.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPendingUser) {
            return next({ message: 'Pending user not found', status: 404 });
        }
        res.json(updatedPendingUser);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return next({ message: 'ID is not valid', status: 400 });
        }
        next({ message: err.message, status: 500 });
    }
};

export const deletePendingUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedPendingUser = await PendingUsers.findByIdAndDelete(id);
        if (!deletedPendingUser) {
            return next({ message: 'Pending user not found', status: 404 });
        }
        res.json({ message: 'Pending user deleted successfully' });
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return next({ message: 'ID is not valid', status: 400 });
        }
        next({ message: err.message, status: 500 });
    }
};