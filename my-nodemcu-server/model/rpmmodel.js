const mongoose = require('mongoose');

const RpmSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    rpm: {
        type: Number,
        required: true,
    },
    runtime: {
        type: Number,
        required: true,
    },
    rpms: {
        type: Number,
        required: false,
    },
    totaltime: {
        type: Number,
        required: false,
    },
    ideltime: {
        type: Number,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Rpm', RpmSchema);
