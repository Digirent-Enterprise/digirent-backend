const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  inquiryType: {
    enum: ["Account", "Product", "Others"],
  },
  inquiryDescription: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

let Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
