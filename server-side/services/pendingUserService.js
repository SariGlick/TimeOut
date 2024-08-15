import PendingUsers from '../models/pendingUser.model';

export const getAllPendingUsersService = async () => {
    return await PendingUsers.find().select('-__v');
};

export const createPendingUserService = async (userData) => {
    const newPendingUser = new PendingUsers(userData);
    await newPendingUser.validate();
    return await newPendingUser.save();
};

export const getPendingUserByIdService = async (id) => {
    return await PendingUsers.findById(id).select('-__v');
};

export const updatePendingUserService = async (id, updateData) => {
    return await PendingUsers.findByIdAndUpdate(id, updateData, { new: true });
};

export const deletePendingUserService = async (id) => {
    return await PendingUsers.findByIdAndDelete(id);
};