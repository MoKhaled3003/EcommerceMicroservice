let OrdersController = require('../controllers/orders.controller')
const {JoiValidator} = require('../../FilterProducts/middleware/validation')
// Modules
const express = require("express");
const { auth } = require('../../FilterProducts/middleware/authintication');
const router = express.Router();

router.post("/",auth,OrdersController.makeOrder);
router.get("/",auth,new JoiValidator([]) ,OrdersController.getOrders);
router.delete("/:id",auth,new JoiValidator([]) ,OrdersController.cancelOrder);



module.exports = router;