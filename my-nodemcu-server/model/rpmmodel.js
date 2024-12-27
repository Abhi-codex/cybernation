const mongoose = require('mongoose');

const RpmSchema = new mongoose.Schema({
    moisture1: {
        type: Number,
        required: false,
    },
    moisture2: {
        type: Number,
        required: false,
    },
    moisture3: {
        type: Number,
        required: false,
    },
    moisture4: {
        type: Number,
        required: false,
    },
    waterVolume: {
        type: Number,
        required: false,
    },
    temperature: {
        type: Number,
        required: false,
    },
    humidity: {
        type: Number,
        required: false,
    },
    pressure: {
        type: Number,
        required: false,
    },
    airFlow: {
        type: Number,
        required: false,
    },
    waterLevel: {
        type: Number,
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Rpm', RpmSchema);
