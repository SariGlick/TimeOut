import Users from "../models/user.model.js";

export const getUserById_service = async (id) => {
	return await Users.findById(id).populate('visitsWebsites profiles preferences').select('-__v');
}