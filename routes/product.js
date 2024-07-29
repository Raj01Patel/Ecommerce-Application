const express = require("express");
const productController = require("../controllers/product")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

const router = express.Router();

router.get("/list", authMiddleware, productController.listProducts)
router.post("/create", authMiddleware, roleMiddleware(["SELLER", "ADMIN"]), productController.createProduct)
router.post("/edit/:id", authMiddleware, roleMiddleware(["SELLER"]), productController.editProduct)
router.delete("/delete/:id",authMiddleware,roleMiddleware(["SELLER", "ADMIN"]),productController.deleteProduct)

module.exports = router;