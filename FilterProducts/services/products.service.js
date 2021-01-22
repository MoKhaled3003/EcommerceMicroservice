
//models
const Product = require("../models/index")["Product"];
const Account = require("../models/index")["Account"];
const Holded_Amount = require("../models/index")["Holded_Amount"];
const sequelize = require("../models/index")['sequelize'];

let {
  paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
const BusinessError = require('../middleware/businessError')
const Op = Sequelize.Op;


//helper function to get logged in user balance and return query filter for sequelize
async function getBalance(id) {

  let account = await Account.findOne({
    where : {
      user_id : id
    },
    attributes:['balance']
  });

  let holded_amount = await Holded_Amount.findOne({
    where: {
        user_id: id
    },
    attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
    raw:true
    });

   if(!holded_amount.total) holded_amount.total = 0

  let filter = {}
  let allowed_balance = parseFloat(account.dataValues.balance) - parseFloat(holded_amount.total)

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