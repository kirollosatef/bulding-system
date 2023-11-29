const mongoose = require("mongoose");

const rentSchema = mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    building: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
    period: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    from: {
      type: Date,
      trim: true,
    },
    to: {
      type: Date,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
    },
    timeToPay: {
      type: Number,
      trim: true,
    },
    rentTime: Date,
    contractNumber: {
      type: Number,
      default: 1024,
    },
  },
  { timestamps: true }
);
const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;
