let OrdersService = require('../services/orders.service')

class OrdersController {
    static async makeOrder(req,res){
 
        let data = await OrdersService.makeOrder(req.body,req.user);
        return res.status(data.code).send(data.message)
    }
    static async getOrders(req,res){
 
        let data = await OrdersService.getOrders(req.user.id,req.query.page);
        return res.status(data.code).send(data.message)
    }
    static async cancelOrder(req,res){
 
        let data = await OrdersService.cancelOrder(req.params.id,req.user);
        return res.status(data.code).send(data.message)
    }
}
module.exports = OrdersController