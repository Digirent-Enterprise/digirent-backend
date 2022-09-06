const { Product, Category } = require("../models");

const categoryController = {
  //add category
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find().populate('products');
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get category
  getCategory: async (req, res) => {
    try {
      const category = await Category.find({ queryName: req.query.queryName }).populate('products');
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = categoryController;
