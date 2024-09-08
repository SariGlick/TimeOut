import * as userService from '../services/user.service.js';


export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).send(users);
  } catch (err) {
    console.error(err);
    return next({ message: err.message, status: 500 });
  }
};



export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ message: 'ID is not valid', status: 400 });
  }
  
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return next({ message: 'User not found', status: 404 });
    }
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    return next({ message: err.message, status: 500 });
  }
};



export const addUser = async (req, res, next) => {
  try {
    const newUser = await userService.addUser(req.body, req.file);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return next({ message: err.message, status: 500 });
  }
};



export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ message: 'ID is not valid', status: 400 });
  }

  try {
    const user = await userService.deleteUser(id);
    if (!user) {
      return next({ message: 'User not found', status: 404 });
    }
    return res.status(200).send('User deleted successfully!');
  } catch (err) {
    console.error(err);
    return next({ message: err.message, status: 500 });
  }
};



export const updatedUser = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ message: 'ID is not valid', status: 400 });
  }

  try {
    const updatedUser = await userService.updatedUser(id, req.body, req.file);
    if (!updatedUser) {
      return next({ message: 'User not found', status: 404 });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return next({ message: err.message, status: 500 });
  }
};



export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.signIn(email, password);

    // מחזירים את ה-token בתגובה כדי שהלקוח ישמור אותו ב-localStorage
    return res.status(200).json({ user, token });
  } catch (error) {
    return next({ message: 'Auth Failed', status: 401 });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }
    const user = await userService.getUserProfile(token);
    return res.status(200).send({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return next({ message: 'Server Error', status: 500 });
  }
};




