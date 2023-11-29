const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dbymvhk8x/image/upload/v1684949619/unknown_wm4koi.png",
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
