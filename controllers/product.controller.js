const {Product, Category} = require("../BE-digirent/models/models");
const fs = require('fs');

const productController = {
    //add product
    addProduct: async(req, res) => {
        try{
            // const newProduct = new Product(req.body);

            const newProduct = new Product({
                name: req.body.name,
                category: req.body.category,
                brand: req.body.brand,
                description: req.body.description,
                // image: req.file?.filename,
                rentalCost: req.body.rentalCost,
                rentalCostType: req.body.rentalCostType,
                status: req.body.status,
                serial: req.body.serial,
            });

            if(req.files){
                let path = ''
                req.files.forEach(function(files, index, arr){
                    path = path + files.path + ','
                })
                path = path.substring(0, path.lastIndexOf(","))
                newProduct.image = path
            }

            const savedProduct = await newProduct.save();
            if(req.body.category){
                // const category = Category.findById(req.body.category);
                const category = Category.findById(req.body.category);
                await category.updateOne({$push: {products: savedProduct._id}});
            }
            res.status(200).json(savedProduct);

        } catch(err){
            res.status(500).json(err);
        }
    },

    // get all products
    getAllProducts: async(req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    //get product
    getProduct: async(req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate('category');
            res.status(200).json(product);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // update product
    updateProduct: async(req, res) => {
        try{
            const product = await Product.findById(req.params.id);
            await product.updateOne({$set: req.body});
            res.status(200).json('Update successfully!');
        } catch(err){
            res.status(500).json(err);
        }
    },

    // delete product
    deleteProduct: async(req, res) => {
        try{
            await Category.updateMany({products: req.params.id}, {$pull: {products: req.params.id}});
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete successfully!');
        } catch(err){
            res.status(500).json(err);
        }
    }

};

module.exports = productController;