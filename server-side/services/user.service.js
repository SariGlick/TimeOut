import Users from "../models/user.model.js";

export const getUserById_service = async (id) => {
    return await Users.findById(id).populate('visitsWebsites profiles preferences').select('-__v');
}
export const getUserByEmail_service=async(email)=>{
   return await Users.findOne({ email }).populate({ path: 'visitsWebsites', populate: { path: 'websiteId' } }).populate('profiles preferences').select('-__v');
}