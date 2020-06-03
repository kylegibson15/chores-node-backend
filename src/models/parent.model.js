const mongoose = require("mongoose");

const Parent = mongoose.model(
  'Parent',
  new mongoose.Schema(
      {
          name: { type: String, required: true },
          rewards: { morning: { type: Number }, school_and_work: { type: Number }, afternoon: { type: Number }, evening: { type: Number } }
      })
)

module.exports = Parent;