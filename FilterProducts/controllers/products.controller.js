let {ProductsService} = require('../services/products.service')
let {paginate} = require('../middleware/paginate')

module.exports.ProductsController = class {
    async getAllProducts(req,res){
 
        let products = await new ProductsService().findProductsCategory(req.query.category_id,paginate(req.query.page,req));
        return (products) ? res.status(200).send(products) : 
        res.status(404).send({
            message:"No Products have been found"
        })
    }

    async setFeatured(req,res){

        let result = await new ProductsService().updateProduct(req.body);
        return (result) ?  res.status(result.code).send({message : result.message}) :
         res.status(400).send('please enter valid value')
    }
}