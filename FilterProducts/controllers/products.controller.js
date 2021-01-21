let ProductsService = require('../services/products.service')

class ProductsController {
    static async filterProducts(req,res){
 
        let products = await ProductsService.filterProducts(req.query,req.user);

        if (products == fasle ) return res.status(400).send('insuffcient balance')
        if (products == null) return res.status(404).send('there is no products')

        return res.status(200).send(products)

    }
    static async getProduct(req,res){
 
        let data = await ProductsService.getProduct(req.params.id,req.user);
        return res.status(data.code).send(data.message)
    }
}
module.exports = ProductsController