const mongoose = require("mongoose");
const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
      maxLength: 40,
    },
    address: {
      type: String,
      trim: true,
      maxLength: 40,
    },
    phone: {
      type: String,
      trim: true,
      maxLength: 20,
    },
    notes: {
      type: String,
      trim: true,
    },
    
  },
  { timestamps: true }
);
clientSchema.index({ name: 1 });
const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
