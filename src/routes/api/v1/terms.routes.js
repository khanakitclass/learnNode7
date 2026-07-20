const express = require("express");
const { addTerms, getAllTerms, editTerms, deleteTerms, statusTerms } = require("../../../controllers/terms.controller");
const router = express.Router();

// Get all products
router.get('/getAllTerms', getAllTerms);

router.post('/addTerms', addTerms);

router.put('/editTerms/:id', editTerms);

router.patch('/statusTerms/:id', statusTerms);

router.delete('/deleteTerms/:id', deleteTerms);

module.exports = router