let ProductsService = require('../services/products.service')

class ProductsController {
    static async filterProducts(req,res){
 
        let data = await ProductsService.filterProducts(req.query,req.user);
        return res.status(data.code).send(data.message)
    }
    static async getProduct(req,res){
 
        let data = await ProductsService.getProduct(req.params.id,req.user);
        return res.status(data.code).send(data.message)
    }
}
module.exports = ProductsController