const mongoose = require('mongoose');

const Chore = mongoose.model(
  'Chore',
  new mongoose.Schema(
    {
      child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child' },
      completed: { type: Boolean },
      days: {
        monday: { type: Boolean, required: true },
        tuesday: { type: Boolean, required: true },
        wednesday: { type: Boolean, required: true },
        thursday: { type: Boolean, required: true },
        friday: { type: Boolean, required: true },
        saturday: { type: Boolean, required: true },
        sunday: { type: Boolean, required: true }
      },
      description: { type: String },
      image: { data: Buffer, contentType: String },
      name: { type: String, required: true },
      timeOfDay: { type: String }
    },
    { timestamps: true })
)

module.exports = Chore;