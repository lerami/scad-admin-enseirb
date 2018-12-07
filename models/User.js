const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    admin: {
        type: Boolean,
        required: true,
        default: false
    },

    timestamp: {
        type: Number,
        required: true,
        default: Date.now(),
      },
    
      lastUpdated: {
        type: Number,
        default: Date.now(),
    }
})