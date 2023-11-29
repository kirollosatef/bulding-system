const mongoose = require("mongoose");
const buildingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    pieceNumber: {
      type: String,
      trim: true,
    },
    empty: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
buildingSchema.indexes({ number: 1 });
const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
