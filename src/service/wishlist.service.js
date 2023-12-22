const Collection = require('../models/collection.model'); // Assuming the Collection model is in a file called Collection.js

// Create a new collection
async function createCollection(name, userId, rooms, displayItems) {
    try {
        const newCollection = new Collection({
            name,
            user: userId,
            room: rooms,
            display: displayItems
        });
        const savedCollection = await newCollection.save();
        return savedCollection;
    } catch (error) {
        throw error;
    }
}

// Get a collection by ID
async function getCollectionById(collectionId) {
    try {
        const collection = await Collection.findById(collectionId).populate('user').populate('room');
        return collection;
    } catch (error) {
        throw error;
    }
}

// Update a collection by ID
async function updateCollection(collectionId, update) {
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(collectionId, update, { new: true });
        return updatedCollection;
    } catch (error) {
        throw error;
    }
}

// Delete a collection by ID
async function deleteCollection(collectionId) {
    try {
        const deletedCollection = await Collection.findByIdAndDelete(collectionId);
        return deletedCollection;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCollection,
    getCollectionById,
    updateCollection,
    deleteCollection
};