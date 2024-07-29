const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const wishlistController = require("../controllers/wishlistController")
const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlist);

router.post("/add", authMiddleware, wishlistController.addToWishlist);

router.post("/remove", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;