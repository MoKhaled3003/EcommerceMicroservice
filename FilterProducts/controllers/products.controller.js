let ProductsService = require('../services/products.service')

class ProductsController {

    static async filterProducts(req, res) {

        try {
            let products = await ProductsService.filterProducts(req.query, req.user);
            return res.status(200).send(products)
        } catch (err) {
            console.log(err)
            return res.status(err.status).send(err.message)
        }
    }

    static async getProduct(req, res) {

        try {
            let product = await ProductsService.getProduct(req.params.id, req.user);
            return res.status(200).send(product)
        } catch (err) {
             return res.status(err.status).send(err.message)
        }
    }
}
module.exports = ProductsController