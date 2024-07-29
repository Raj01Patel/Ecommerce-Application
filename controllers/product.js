const UserModel = require("../model/user")
const ProductModel = require("../model/product")
const jwt = require("jsonwebtoken")

const listProducts = async (req, res) => {
    const PageSize = req.query.pagesize;
    const PageNo = req.query.pageno;
    const minPrice = req.query.minprice || 0;
    const productList = await ProductModel
        .find({
            // price: {
            //     $gte: minPrice,
            // }
            isActive:true,
        })
        // .sort({ price: 1 })
        .limit(PageSize)
        .skip((PageNo - 1) * PageSize);
    res.json({
        success: true,
        results: productList
    })
}

const createProduct = async (req, res) => {
    const newlyInsertedProduct = await ProductModel.create(req.body)
    res.json({
        success: true,
        message: "Product created successfully",
        data: newlyInsertedProduct._id
    });
}

const editProduct = async (req, res) => {
    const productID = req.params.id;
    await ProductModel.findByIdAndUpdate(productID, { $set: req.body })
    res.json({
        success: true,
        message: "Product edited successfully",
    })
}

const deleteProduct = async (req, res) => {
    await ProductModel.findByIdAndUpdate(req.params.id, {
        $set: { isActive: false }
    })
    res.json({
        success: true,
        message: "Product deleted succesfully"
    })
}

const productController = {
    listProducts,
    createProduct,
    editProduct,
    deleteProduct
};

module.exports = productController;