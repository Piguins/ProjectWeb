const Host = require('../models/host.model'); // Assuming the Host model is in a file called Host.js

// Create a new host
async function createHost(name, email, experience, evaluate, language, phoneNumber) {
    try {
        const newHost = new Host({
            name,
            email,
            experience,
            evaluate,
            language,
            phoneNumber
        });
        const savedHost = await newHost.save();
        return savedHost;
    } catch (error) {
        throw error;
    }
}

// Get a host by ID
async function getHostById(hostId) {
    try {
        const host = await Host.findById(hostId);
        return host;
    } catch (error) {
        throw error;
    }
}

// Update a host by ID
async function updateHost(hostId, update) {
    try {
        const updatedHost = await Host.findByIdAndUpdate(hostId, update, { new: true });
        return updatedHost;
    } catch (error) {
        throw error;
    }
}

// Delete a host by ID
async function deleteHost(hostId) {
    try {
        const deletedHost = await Host.findByIdAndDelete(hostId);
        return deletedHost;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createHost,
    getHostById,
    updateHost,
    deleteHost
};
