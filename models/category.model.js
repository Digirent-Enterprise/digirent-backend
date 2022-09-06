const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  queryName: {
    //tables-and-cellphones
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

let Category = mongoose.model("Category", categorySchema);

module.exports = Category;
