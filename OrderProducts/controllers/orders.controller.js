let OrdersService = require('../../FilterProducts/services/orders.service')

class OrdersController {
    static async makeOrder(req,res){
        try{

            let order = await OrdersService.makeOrder(req.body,req.user.id);
            return res.status(200).send(order)

        }catch(err){
            return res.status(err.status).send(err.message)
        }
    }
    static async getOrders(req,res){
        try{
            let orders = await OrdersService.getOrders(req.user.id,req.query.page);

        }catch(err){
            
        }
        return res.status(data.code).send(data.message)
    }
    static async cancelOrder(req,res){
        try{
            let canceled = await OrdersService.cancelOrder(req.params.id,req.user.id);

        }catch(err){
            
        }
        return res.status(data.code).send(data.message)
    }
}
module.exports = OrdersController