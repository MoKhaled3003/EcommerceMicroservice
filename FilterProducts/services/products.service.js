
//models
const Product = require("../models/index")["Product"];
const Account = require("../models/index")["Account"];

let {
  paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
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
  console.log("outside if positiv",allowed_balance)
  if(allowed_balance > 0) {
    console.log("inside if positiv",allowed_balance)
     filter[Op.lte] = allowed_balance 
    }else{
      throw new Error('invalid balance')
    }
  return filter
}

class ProductsService {
  static async filterProducts(query, user) {

    let pagination = paginate(query.page)
    delete query.page;

    try{
      query['price']  = await getBalance(user.id)
    }catch(e){
      return {
        code: 400,
        message: 'low balance'
      }
    }
    let products = await Product.findAndCountAll({
      where : query,
    limit: pagination.offset,
    offset: pagination.startIndex
    })
    if (!products) return {
      code: 404,
      message: "there is no products"
    }

    return {
      code: 200,
      message: products
    }

  }

  static async getProduct(id,user) {
    let query = {id}
    try{
      query['price']  = await getBalance(user.id)
    }catch(e){
      return {
        code: 400,
        message: 'low balance'
      }
    }

    let product = await Product.findOne({
      where : query
    })
    if (!product) return {
      code: 404,
      message: "there is no product"
    }

    return {
      code: 200,
      message: product
    }

  }
}

module.exports = ProductsService