const express = require('express');
const router = express.Router();
const categoriesRoutes = require("./categories.routes");
const productsRoutes = require("./products.routes");
const reviewsRoutes = require("./reviews.routes")
const userRoutes = require("./auth.routes");
const termsRoutes = require("./terms.routes");
const paymentRoutes = require("./payment.routes");

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/reviews", reviewsRoutes)
router.use("/users", userRoutes)
router.use("/terms", termsRoutes)
router.use("/payment", paymentRoutes)

module.exports = router;