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
        const { category, price, inputValue ,badroom} = req.query;

       
        const filter = {};

        // category filter
        if (category) {
            filter.category = category;
        }
        
        // category filter
        if (badroom) {
            filter.Bedrooms = badroom;
        }
        

        // price filter 
        if (price) {
            const numericPrice = parseFloat(price);
            if (!isNaN(numericPrice)) {
                filter.price = { $gt: numericPrice };
            } else {
                return res.status(400).json({ error: 'Invalid price value' });
            }
        }

        // search Implement 
        if (inputValue) {
            // regular expression 
            filter.location = { $regex: new RegExp(inputValue, 'i') };
        }

        // filter 
        const rooms = await Room.find(filter);

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});















module.exports = router;
