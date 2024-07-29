const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const wishlistRoutes = require("./routes/wishlist");
const postRoute = require("./routes/postRoute");
const orderRoutes = require("./routes/order")
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();

app.use(express.json());

mongoose.
    connect(process.env.DATABASE_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("Error connecting DB", err));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/posts",postRoute);
app.use("/api/v1/order",authMiddleware,orderRoutes)

app.listen(10000, () => {
    console.log("Server is up and running at port 10000");
})