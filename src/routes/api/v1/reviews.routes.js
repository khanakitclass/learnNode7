const express = require("express");
const { addReview, getAllReviews, editReview, deleteReview, statusReview } = require("../../../controllers/reviews.controller");
const router = express.Router();

// Get all products
router.get('/getAllReviews', getAllReviews);

router.post('/addReview', addReview);

router.put('/editReview/:id', editReview);

router.patch('/statusReview/:id', statusReview);

router.delete('/deleteReview/:id', deleteReview);

module.exports = router