const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
    location:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    dateRange:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
});

module.exports = RoomsSchema;
