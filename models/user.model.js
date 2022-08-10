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
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number",
          );
        }
      },
      private: true, // used by the toJSON plugin
      selected: false,
    },

    role: {
      type: String,
      default: "user",
    },

    avatar: {
      type: String,
    },

    token: {
      type: String,
      selected: false,
    },

    phone: {
      type: String,
      trim: true,
      minlength: 9,
    },
    location: {
      type: String,
    },
    status: {
      type: Boolean, //true: active, false: disabled
      default: true,
    },

    createdDate: {
      type: String,
      required: true,
      default: Date.now,
    },
  },

  { typeKey: "type" },
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
