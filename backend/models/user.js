import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: [2, "Name must be at least 2 characters."],
    maxLength: [50, "Name cannot exceed 50 characters."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  avatar: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
