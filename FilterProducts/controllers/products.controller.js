let ProductsService = require('../services/products.service')

class ProductsController {
    static async getProducts(req,res){
 
        let data = await ProductsService.getProducts(req.query,req.user);
        return res.status(data.code).send(data.message)
    }
}
module.exports = ProductsController