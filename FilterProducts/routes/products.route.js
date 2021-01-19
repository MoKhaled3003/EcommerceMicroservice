let ProductsController = require('../controllers/products.controller')
const {JoiValidator} = require('../middleware/validation')
// Modules
const express = require("express");
const router = express.Router();

router.get("/",new JoiValidator(['page','category_id','brand']), ProductsController.getProducts);

module.exports = router;