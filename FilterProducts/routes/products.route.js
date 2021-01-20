let ProductsController = require('../controllers/products.controller')
const {JoiValidator} = require('../middleware/validation')
// Modules
const express = require("express");
const { auth } = require('../middleware/authintication');
const router = express.Router();

router.get("/",auth,new JoiValidator(['category_id','brand','page',]) ,ProductsController.filterProducts);
router.get("/:id",auth,new JoiValidator(['id']) ,ProductsController.getProduct);


module.exports = router;