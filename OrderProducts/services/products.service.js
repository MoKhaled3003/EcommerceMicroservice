const {
  sequelize
} = require("../models/index");
const Product = require("../models/index")["Product"];
module.exports.ProductsService = class {
  async findProductsCategory(category_id,page) {
    let result = await sequelize.query(`
    select prod.id,prod.name,prod.image_uri,prod.featured,prod.category_id,res.price,res.provider_id
    from Products prod 
    inner join
    (
    select p.* 
    from (
        select product_id, min(price) as MinPrice
        from Provider_Products where product_id in 
        (select id from Products where category_id in (select id from Categories where parent_id = ${category_id} or category_id = ${category_id}))
        group by product_id
    ) pm
    inner join Provider_Products p on pm.product_id = p.product_id and pm.MinPrice = p.price
    ) res
    on res.product_id = prod.id
    order by price ${page}
    `)
    return (!result[0].length) ? null : result[0]
  }


  async updateProduct(body) {

    let product = await Product.findOne({
      where: {
        id: body.id
      }
    })
    if (product) {
      if(product.featured == body.featured){
        return {
          code : 400,
          message : "product already set to this value"
        }
      }
      Product.update({
        "featured" : body.featured
      }, {
        where: {
          id: body.id
        }
      });
      return {
        code : 200,
        message : "product successfully updated"
      }
    }else{
      return {
        code : 404,
        message : "Product Not Found"
      }
    }
  }
}