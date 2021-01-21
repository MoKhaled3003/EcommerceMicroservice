
//models
const Product = require("../models/index")["Product"];
const Account = require("../models/index")["Account"];

let {
  paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
const BusinessError = require('../middleware/businessError')
const Op = Sequelize.Op;


//helper function to get logged in user balance and return query filter for sequelize
async function getBalance(id) {
  let data = await Account.findOne({
    where : {
      user_id : id
    },
    attributes:['balance','holded_amount']
  });

  let filter = {}
  let allowed_balance = data.dataValues.balance - data.dataValues.holded_amount

  if(allowed_balance <= 0) throw new BusinessError(1,'balance') 

  filter[Op.lte] = allowed_balance 
  return filter
}

class ProductsService {
  static async filterProducts(query, user) {

    let pagination = paginate(query.page)
    delete query.page;

    let res = await getBalance(user.id)

    query['price']  = res
    
    let products = await Product.findAndCountAll({
    where : query,
    limit: pagination.offset,
    offset: pagination.startIndex
    })

    if (!products) throw new BusinessError(0,'products') 

    return products
  }

  static async getProduct(id,user) {
    let query = {id}

    let res = await getBalance(user.id)

    query['price']  = res
    let product = await Product.findOne({
      where : query
    })

    if (!product) throw new BusinessError(0,'products') 

    return product

  }
}

module.exports = ProductsService