const ProductModel = require("../model/product");
const OrderModel = require("../model/order")

const placeOrder = async (req, res) => {
    const productIds = req.body.items.map((product) => product.product);
    const productsList = await ProductModel.find({ _id: productIds });

    const areItemsInStock = req.body.items.every((p) =>
        productsList.find((product) => product._id == p.product).stock >= p.qty
    );

    if (!areItemsInStock) {
        return res.status(400).json({
            success: false,
            message: "One or more ordered product(s) are out of stock",
        });
    }

    let totalAmountToPay = productsList.reduce((total, product) => {
        const productQty = req.body.items.find((p) => p.product == product._id).qty;
        return total + product.price * productQty;
    }, 0);

    if (totalAmountToPay < 500) {
        totalAmountToPay += 50; // Delivery Charges
    }

    const orderDetails = {
        items: req.body.items,
        totalAmount: totalAmountToPay,
        deliveryAddress: req.body.deliveryAddress,
        billingAddress: req.body.deliveryAddress, // Same as delivery address
        modeOfPayment: req.body.modeOfPayment,
        orderStatus: "PENDING",
        user: req.user._id,
    };

    const { _id } = await OrderModel.create(orderDetails);

    req.body.items.forEach(async (product) => {
        await ProductModel.findByIdAndUpdate(product.product, {
            $inc: { stock: -product.qty },
        });
    });

    res.json({
        success: true,
        message: "order succesfully placed",
        data: _id
    })
}

const orderController = {
    placeOrder,
};

module.exports = orderController;