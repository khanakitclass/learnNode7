const express = require("express");
const { addProducts, getAllProducts, assignTagToProduct , getAllProductTag} = require("../../../controllers/product.controller.");
const router = express.Router();

// Get all products
router.get('/getAllProducts', getAllProducts);

// Add a new product
router.post('/addProduct', addProducts);

router.post('/assignTagToProduct', assignTagToProduct);

router.get("/getAllProductTag", getAllProductTag)

// Update a product
router.put("/updateProduct/:id", (req, res) => {
    console.log("req : params : ", req.params);
    res.send("product updated successfully")
});

// Delete a product
router.delete("/deleteProduct/:id", (req, res) => {
    console.log("req : params : ", req.params);
    res.send("product deleted successfully")
});

module.exports = router;