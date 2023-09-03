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
        const { category, price, inputValue } = req.query;

       
        const filter = {};

        // category filter
        if (category) {
            filter.category = category;
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






router.get('/', async (req, res) => {
    try {
        const { category, price } = req.query;
        const filter = {}

        if (!category && price === '100') {
            const rooms = await Room.find({});
            res.status(200).json(rooms);
        } else {

            if (category) {
                filter.category = category;
            }

            if (price) {
                const numericPrice = parseFloat(price);
                if (!isNaN(numericPrice)) { // Check if numericPrice is a valid number
                    filter.price = { $gt: numericPrice };
                    const rooms = await Room.find(filter);
                    res.status(200).json(rooms);
                } else {
                    // Handle invalid price here, maybe return an error response
                }
            }
           res.status(200).json("hello world") 
        }

    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});


// router.get('/', async (req, res) => {
//     const {  price } = req.query;
//     let filter = {}
//     if(!price){
//         res.status(200).json("data not found");
//     }

//     const result = Room.find({$gt:+price})
//     console.log(result)
//     res.send(200).json(result)
// })










module.exports = router;
