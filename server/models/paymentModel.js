const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema(
  {
    rent: { type: mongoose.Schema.Types.ObjectId, ref: "Rent" },
    clientName: String,
    contractNumber: Number,
    buildingNumber: Number,
    buildingName: String,
  },
  { timestamps: true }
);
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
