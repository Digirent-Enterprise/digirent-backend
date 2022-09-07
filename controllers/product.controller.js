const { Product, Category, Transaction } = require("../models");
const { uploadMultipleFiles } = require("../services/cloudinary.service");
const { CloudinaryService, TransactionService } = require("../services");

const productController = {
  //add product
  addProduct: async (req, res) => {
    console.log(req.body);
    try {
      const newProduct = new Product({
        name: req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        images: req.body.images || [],
        rentalCost: req.body.rentalCost,
        rentalCostType: req.body.rentalCostType,
        status: req.body.status || true,
        serial: req.body.serial,
        category: req.body.category,
      });
      const savedProduct = await newProduct.save();
      await Category.findOneAndUpdate(
        { name: req.body.category },
        { $push: { products: savedProduct._id } },
      ).catch((e) => console.log(e));
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get product
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const excludeIntervals =
        await TransactionService.getTransactionExcludeIntervals(req.params.id);
      const newMappingProduct = {
        excludeIntervals: excludeIntervals,
        images: product.images,
        category: product.category,
        _id: product._id,
        name: product.name,
        brand: product.brand,
        description: product.description,
        rentalCost: product.rentalCost,
        rentalCostType: product.rentalCostType,
        status: product.status,
        serial: product.serial,
        createdDate: product.createdDate,
      };
      res.status(200).json(newMappingProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update product
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.body.id },
        { ...req.body },
      );

      if (req.body.category) {
        // delete from the old category
        await Category.updateMany(
          { products: product._id },
          { $pull: { products: product._id } },
        );

        // update into new category
        const category = Category.find({ name: req.body.category });
        await category.updateOne({ $push: { products: product._id } });
      }

      res.status(200).json("Update successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete product
  deleteProduct: async (req, res) => {
    try {
      await Category.updateMany(
        { products: req.params.id },
        { $pull: { products: req.params.id } },
      );
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  uploadSingleImage: async (req, res) => {
    const file = req.files[0];
    const urlObj = await CloudinaryService.uploadSingleFile(file);
    if (!urlObj) res.sendStatus(404);
    return res.status(200).json({ url: urlObj.url });
  },

  getMostRental: async (req, res) => {
    const mostRental = await Transaction.aggregate([
      {
        $group: {
          _id: "$productId",
          rentalTimes: { $count: {} },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    await Product.populate(mostRental, { path: "_id" });
    return res.json(mostRental);
  },
};

module.exports = productController;
