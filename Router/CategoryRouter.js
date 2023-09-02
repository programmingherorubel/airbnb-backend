const express = require('express');
const mongoose = require('mongoose');
const CategorySchema = require('../Schema/CategorySchema'); // Make sure to provide the correct path

const Category = mongoose.model("Category", CategorySchema);
const router = express.Router();


router.post('/',async(req,res)=>{
    const  singleIcon = Category(req.body) 
    try{
        const addIcon = await singleIcon.save()
        res.status(200).json(addIcon)
    }
    catch(error){
        res.status(500).json({ "error": error.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});

module.exports = router;
