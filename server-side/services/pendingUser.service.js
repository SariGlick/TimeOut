import PendingUsers from '../models/pendingUser.model.js';

export const getAllPendingUsers_service = async () => {
	return await PendingUsers.find().select('-__v');
};

export const createPendingUser_service = async (userData) => {
	const newPendingUser = new PendingUsers(userData);
	await newPendingUser.validate();
	return await newPendingUser.save();
};

export const getPendingUserById_service = async (id) => {
	return await PendingUsers.findById(id).select('-__v');
};

export const updatePendingUser_service = async (id, updateData) => {
	return await PendingUsers.findByIdAndUpdate(id, updateData, { new: true });
};

export const deletePendingUser_service = async (id) => {
	return await PendingUsers.findByIdAndDelete(id);
};