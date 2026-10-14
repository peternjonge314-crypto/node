const mongoose = require("mongoose");

// Define the fields accepted for each user document.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative."],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
