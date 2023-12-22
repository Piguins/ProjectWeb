const Room = require('../models/product.model'); // Assuming the Room model is in a file called Room.js

// Create a new room
async function createRoom(name, hostId, startday, endday, maximumcus, img, display, region, price, typeId, bed, shower, hosthome, address, isRented, validByAdmin, visitTime, datesRented) {
    try {
        const newRoom = new Room({
            name,
            host: hostId,
            startday,
            endday,
            maximumcus,
            img,
            display,
            region,
            price,
            type: typeId,
            bed,
            shower,
            hosthome,
            address,
            isRented,
            validByAdmin,
            visitTime,
            datesRented
        });
        const savedRoom = await newRoom.save();
        return savedRoom;
    } catch (error) {
        throw error;
    }
}

// Get a room by ID
async function getRoomById(roomId) {
    try {
        const room = await Room.findById(roomId).populate('host').populate('type');
        return room;
    } catch (error) {
        throw error;
    }
}

// Update a room by ID
async function updateRoom(roomId, update) {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, update, { new: true });
        return updatedRoom;
    } catch (error) {
        throw error;
    }
}

// Delete a room by ID
async function deleteRoom(roomId) {
    try {
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        return deletedRoom;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
};
