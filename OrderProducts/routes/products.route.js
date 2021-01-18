let {ProductsController} = require('../controllers/products.controller')
const {JoiValidator} = require('../middleware/validation')
// Modules
const express = require("express");
const router = express.Router();


router.get("/ProductsInCategory/",new JoiValidator(['page','category_id']),new ProductsController().getAllProducts);
router.put("/setFeatured/",new JoiValidator(['id','featured']),new ProductsController().setFeatured);


module.exports = router;