import { 
    getAllPendingUsersService, 
    createPendingUserService, 
    getPendingUserByIdService, 
    updatePendingUserService, 
    deletePendingUserService 
} from '../services/pendingUserService';

export const getAllPendingUsers = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const pendingUsers = await getAllPendingUsersService();
        return res.status(200).json(pendingUsers);
=======
        const pendingUsers = await PendingUsers.find().populate('userID').select('-__v');
        res.json(pendingUsers);
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    } catch (err) {
        return next({ message: err.message, status: 500 });
    }
};

export const createPendingUser = async (req, res, next) => {
<<<<<<< HEAD
    try {
        const newPendingUser = await createPendingUserService(req.body);
        return res.status(201).json(newPendingUser);
=======
    console.log(req.body);

    try {

        const newPendingUser = new PendingUsers(req.body);
        await newPendingUser.validate();
        await newPendingUser.save();
        res.status(201).json(newPendingUser);
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    } catch (err) {
        return next({ message: err.message, status: 500 });
    }
};

export const getPendingUserById = async (req, res, next) => {
<<<<<<< HEAD
    const { id } = req.params;
    try {
        const pendingUser = await getPendingUserByIdService(id);
=======
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
    try {
        const pendingUser = await PendingUsers.findById(req.params.id).populate('userID').select('-__v');
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
        if (!pendingUser) {
            return next({ message: 'Pending user was not found', status: 404 });
        }
        return res.status(200).json(pendingUser);
    } catch (err) {
<<<<<<< HEAD
        if (err.name === 'CastError') {
            return next({ message: 'ID is not valid', status: 400 });
        }
        return next({ message: err.message, status: 500 });
=======
        next({ message: err.message, status: 500 });
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    }
};

export const updatePendingUser = async (req, res, next) => {
<<<<<<< HEAD
    const { id } = req.params;
=======
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    try {
        const updatedPendingUser = await updatePendingUserService(id, req.body);
        if (!updatedPendingUser) {
            return next({ message: 'Pending user not found', status: 404 });
        }
        return res.status(200).json(updatedPendingUser);
    } catch (err) {
<<<<<<< HEAD
        if (err.name === 'CastError') {
            return next({ message: 'ID is not valid', status: 400 });
        }
        return next({ message: err.message, status: 500 });
=======
        next({ message: err.message, status: 500 });
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    }
};

export const deletePendingUser = async (req, res, next) => {
<<<<<<< HEAD
    const { id } = req.params;
=======
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'ID is not valid', status: 400 });
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    try {
        const deletedPendingUser = await deletePendingUserService(id);
        if (!deletedPendingUser) {
            return next({ message: 'Pending user not found', status: 404 });
        }
        return res.status(200).json({ message: 'Pending user deleted successfully' });
    } catch (err) {
<<<<<<< HEAD
        if (err.name === 'CastError') {
            return next({ message: 'ID is not valid', status: 400 });
        }
        return next({ message: err.message, status: 500 });
=======
        next({ message: err.message, status: 500 });
>>>>>>> b75e9704128e514ba157ee41a54c709d291e4f6c
    }
};
