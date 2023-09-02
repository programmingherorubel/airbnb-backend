const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    }
});

module.exports = categorySchema;
