const express = require("express");
const { addCategory, getAllCategory, getCategory, updateCategory, deleteCategory, getAllActiveCategory } = require("../../../controllers/category.controller");
const auth = require("../../../middleware/auth");
const upload = require("../../../middleware/upload");
const router = express.Router();

// Get all categories
router.get('/getAllCategories',getAllCategory);
// router.get('/getAllCategories', (req, res) => {
//     console.log("req : ", req);
//     res.end("Get all categories");
// });

router.get('/getAllActiveCategories',getAllActiveCategory);


router.get('/getCategory/:_id',getCategory);


// Add a new category
router.post('/addCategory', upload.single('category_img'),  addCategory);
// router.post('/addCategory', (req, res) => {
//     console.log("req.body : ", req.body);
//     res.status(201).json({
//         success: true,
//         data: req.body,
//         message: "Category added successfully"
//     });
// });

// Update a category
router.put("/updateCategory/:_id", updateCategory);

router.delete("/deleteCategory/:_id", deleteCategory);

// Delete a category
router.delete("/deleteCategory/:id", (req, res) => {
    console.log("req : params : ", req.params);
    res.send("category deleted successfully")
});

module.exports = router;