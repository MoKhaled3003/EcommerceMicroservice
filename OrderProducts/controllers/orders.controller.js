let OrdersService = require('../services/orders.service')

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
            return res.status(200).send(orders)

        }catch(err){
        return res.status(err.status).send(err.message)
        }
    }
    static async cancelOrder(req,res){
        try{
            await OrdersService.cancelOrder(req.params.id,req.user.id);
            return res.status(200).send('order has been canceled')

        }catch(err){
        return res.status(err.status).send(err.message)
        }
    }
    static async deliverOrder(req,res){
        try{
            await OrdersService.deliverOrder(req.params.id,req.user.id);
            return res.status(200).send('order has been delivered')

        }catch(err){
        return res.status(err.status).send(err.message)
        }
    }
}
module.exports = OrdersController