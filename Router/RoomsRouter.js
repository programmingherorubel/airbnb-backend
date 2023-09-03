const express = require('express');
const mongoose = require('mongoose');
const CategorySchema = require('../Schema/RoomsSchema'); // Make sure to provide the correct path

const Room = mongoose.model("Room", CategorySchema);
const router = express.Router();

router.post('/', async (req, res) => {
    const singleRoom = Room(req.body)
    try {
        const addRoom = await singleRoom.save()
        res.status(200).json(addRoom)
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
})



router.get('/', async (req, res) => {
    try {
        const { category, price } = req.query;
        
        if (!category && price === '100') {
            const rooms = await Room.find({});
            res.status(200).json(rooms);
        } else {
            const filter = {}
            if (category) {
                filter.category = category;
            }
            
            if (price) {
                const numericPrice = parseFloat(price);
                if (!isNaN(numericPrice)) { // Check if numericPrice is a valid number
                    filter.price = { $gt: numericPrice };
                } else {
                    // Handle invalid price here, maybe return an error response
                }
            }
            console.log(filter)
            const rooms = await Room.find(filter);
            res.status(200).json(rooms);
        }
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});







module.exports = router;
