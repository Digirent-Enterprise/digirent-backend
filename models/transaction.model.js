const mongoose = require("mongoose");

const Transaction = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userEmail: {
    type: String,
    required: true,
  },
  rentalCost: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  latePenalty: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: "VND",
  },
  from: {
    type: Date,
    required: true,
    default: Date.now,
  },
  to: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 1),
  },
  productImageUrl: {
    type: String,
  }
});

let Product = mongoose.model("Transaction", Transaction, "transactions");

module.exports = Product;
