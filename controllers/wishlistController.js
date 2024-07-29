const UserModel = require("../model/user");
const ProductModel = require("../model/product")

const addToWishlist = async (req, res) => {
    let validID = await ProductModel.findById(req.body.productId)
    console.log(validID);
    if (!validID) {
        return res.status(400).json({
            success: false,
            meassage: "invalid wishlist id"
        })
    }
    await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { wishlist: req.body.productId },
    });
    res.json({
        success: true,
        meassage: "add wishlist sucessfully"
    })
}



const removeFromWishlist = async (req, res) => {
    await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.body.productId },
    });
    res.json({
        success: true,
        message: "Remove from wishlist API",
    });
}
const getWishlist = async (req, res) => {
    const wishlist = await UserModel.findById(req.user._id).populate("wishlist").select("wishlist");
    console.log(wishlist);
    res.json({
        success: true,
        message: "Get wishlist API"
    })
}



const wishlistController = {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
};

module.exports = wishlistController;