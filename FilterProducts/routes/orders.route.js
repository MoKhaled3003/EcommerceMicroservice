let OrdersController = require('../controllers/orders.controller')
const {JoiValidator} = require('../middleware/validation')
// Modules
const express = require("express");
const { auth } = require('../middleware/authintication');
const router = express.Router();

router.post("/",auth,new JoiValidator([]) ,OrdersController.makeOrder);
router.get("/",auth,new JoiValidator([]) ,OrdersController.getOrders);
router.delete("/:id",auth,new JoiValidator([]) ,OrdersController.cancelOrder);



module.exports = router;