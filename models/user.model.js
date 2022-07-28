const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        console.log("valiueeee", value);
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number",
          );
        }
      },
      private: true, // used by the toJSON plugin
    },

    role: {
      type: String,
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    token: {
      type: String,
    },

    phone: {
      type: String,
      trim: true,
      minlength: 9,
    },
    picture: {
      type: String,
    },

    createdDate: {
      type: String,
    },
  },
  { typeKey: "type" },
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
