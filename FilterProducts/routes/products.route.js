let ProductsController = require('../controllers/products.controller')
const {JoiValidator} = require('../middleware/validation')
// Modules
const express = require("express");
const { auth } = require('../middleware/authintication');
const router = express.Router();

router.get("/",auth, ProductsController.getProducts);

module.exports = router;