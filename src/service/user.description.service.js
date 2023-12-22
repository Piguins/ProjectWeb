const Description = require('../userDescription.model');

// Create
const createDescription = async (descriptionData) => {
  try {
    const newDescription = new Description(descriptionData);
    const savedDescription = await newDescription.save();
    return savedDescription;
  } catch (error) {
    throw new Error('Error creating description');
  }
};

// Read
const getDescriptionById = async (descriptionId) => {
  try {
    const description = await Description.findById(descriptionId);
    return description;
  } catch (error) {
    throw new Error('Description not found');
  }
};

// Update
const updateDescription = async (descriptionId, updatedData) => {
  try {
    const updatedDescription = await Description.findByIdAndUpdate(descriptionId, updatedData, { new: true });
    return updatedDescription;
  } catch (error) {
    throw new Error('Error updating description');
  }
};

// Delete
const deleteDescription = async (descriptionId) => {
  try {
    await Description.findByIdAndDelete(descriptionId);
    return 'Description deleted successfully';
  } catch (error) {
    throw new Error('Error deleting description');
  }
};

module.exports = {
  createDescription,
  getDescriptionById,
  updateDescription,
  deleteDescription,
};