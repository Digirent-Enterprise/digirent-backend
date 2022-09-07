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
    type: String,
    enum: [
      "Account",
      "Product",
      "Others",
      "Return Product",
      "Transaction and Payment",
      "Rent Policy",
    ],
    default: "Product",
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

let Inquiry = mongoose.model("Inquiry", inquirySchema, "inquiries");

module.exports = Inquiry;
