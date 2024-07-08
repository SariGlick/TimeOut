// import user from '../models/user'

// // Controller functions for users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.createUser = async (req, res) => {
//     const newUser = new User(req.body);
//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
