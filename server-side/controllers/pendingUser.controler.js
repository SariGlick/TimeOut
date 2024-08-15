import { 
    getAllPendingUsersService, 
    createPendingUserService, 
    getPendingUserByIdService, 
    updatePendingUserService, 
    deletePendingUserService 
} from '../services/pendingUserService';

export const getAllPendingUsers = async (req, res, next) => {
    try {
        const pendingUsers = await getAllPendingUsersService();
        return res.status(200).json(pendingUsers);
    } catch (err) {
        return next({ message: err.message, status: 500 });
    }
};

export const createPendingUser = async (req, res, next) => {
    try {
        const newPendingUser = await createPendingUserService(req.body);
        return res.status(201).json(newPendingUser);
    } catch (err) {
        return next({ message: err.message, status: 500 });
    }
};

export const getPendingUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const pendingUser = await getPendingUserByIdService(id);
        if (!pendingUser) {
            return next({ message: 'Pending user was not found', status: 404 });
        }
        return res.status(200).json(pendingUser);
    } catch (err) {
        if (err.name === 'CastError') {
            return next({ message: 'ID is not valid', status: 400 });
        }
        return next({ message: err.message, status: 500 });
    }
};

export const updatePendingUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedPendingUser = await updatePendingUserService(id, req.body);
        if (!updatedPendingUser) {
            return next({ message: 'Pending user not found', status: 404 });
        }
        return res.status(200).json(updatedPendingUser);
    } catch (err) {
        if (err.name === 'CastError') {
            return next({ message: 'ID is not valid', status: 400 });
        }
        return next({ message: err.message, status: 500 });
    }
};

export const deletePendingUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPendingUser = await deletePendingUserService(id);
        if (!deletedPendingUser) {
            return next({ message: 'Pending user not found', status: 404 });
        }
        return res.status(200).json({ message: 'Pending user deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return next({ message: 'ID is not valid', status: 400 });
        }
        return next({ message: err.message, status: 500 });
    }
};
