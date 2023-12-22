const User = require('../models/users.model');

// Create
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Read
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('User not found');
  }
};

// Update
const updateUser = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

// Delete
const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    return 'User deleted successfully';
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
