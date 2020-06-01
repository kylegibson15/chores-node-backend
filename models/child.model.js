
const mongoose = require('mongoose');

const Child = mongoose.model(
    'Child',
    new mongoose.Schema(
        {
            image: { data: Buffer, contentType: String },
            name: { type: String, required: true },
            parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
            total_points: { type: Number }
        })
)

module.exports = Child;