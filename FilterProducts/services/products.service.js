const {
  sequelize
} = require("../models/index");
const Product = require("../models/index")["Product"];
let {
  paginate
} = require('../middleware/paginate')

class ProductsService {
  static async findProductsCategory(body, page) {
    let allowed_balance = await Account.findOne({
      where : {
        user_id : req
      }
    })
    let products = await Product.findAndCountAll
  }
}

module.exports = ProductsService