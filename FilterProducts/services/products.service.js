const {
  sequelize
} = require("../models/index");
const Product = require("../models/index")["Product"];
const Account = require("../models/index")["Account"];

let {
  paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ProductsService {
  static async getProducts(query, user) {

    let pagination = paginate(query.page)
    delete query.page;

    let allowed_balance = await Account.findOne({
      where : {
        user_id : user.id
      },
      attributes:['balance']
    });

    let filter = {}
    filter[Op.lte] = allowed_balance.dataValues.balance;
    query['price'] = filter

    let products = await Product.findAndCountAll({
      where : query,
    limit: pagination.offset,
    offset: pagination.startIndex
    })
    if (!products) return {
      code: 400,
      message: "email or password is incorrect"
    }

    return {
      code: 200,
      message: products
    }

  }
}

module.exports = ProductsService