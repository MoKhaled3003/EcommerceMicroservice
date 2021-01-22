//models
const Order = require("../models/index")["Order"];
const Order_Detail = require("../models/index")["Order_Detail"];
const Account = require("../models/index")["Account"];
const sequelize = require("../models/index").sequelize
let {
    paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment')
const BusinessErrors = require('../middleware/businessError')
class OrdersService {

    static async getOrders(user_id, page) {
        let pagination = paginate(page)

        let orders = await Order.findAndCountAll({
            where: {
                user_id
            },
            limit: pagination.offset,
            offset: pagination.startIndex
        })
        if (!orders) throw new BusinessErrors(0,'orders')

        return orders
    }

    static async cancelOrder(order_id, user_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let order = await Order.findOne({
                where: {
                    id: order_id
                }
            })

            if (!order) throw new BusinessErrors(0,'order')

            if (order.status == 'delivered') throw new BusinessErrors(2,'order')

            let account = await Account.findOne({
                where: {
                    user_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!account) throw new BusinessErrors(0,'account')


            let orderDetail = await Order_Detail.findAll({
                where: {
                    order_id
                },
                raw:true
            }, {
                transaction
            });

            let OrdersTotal = 0;
            orderDetail.forEach(e=>{
                OrdersTotal += parseFloat(e.amount)
            })
            
            let deletedOrderDetail = orderDetail.map(e=>e.id)
            console.log('holded before',account.holded_amount)
            console.log('orderdetail',orderDetail)


            let releaseHold = parseFloat(account.holded_amount) - OrdersTotal
            account.holded_amount = releaseHold

            
            console.log('holded after',account.holded_amount)

            await account.save({
                fields: ['holded_amount'],
                transaction
            });

            Order_Detail.destroy({ where: { id: deletedOrderDetail }})
            Order.destroy({ where: { id: order_id }})

            await transaction.commit();

            let d = moment(order.createdAt)
            return true

        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            console.log(err);
            if (transaction) await transaction.rollback();
            throw err
        }

    }

    static async makeOrder(body, user_id) {
        console.log(body)
        let transaction;
        try {
            transaction = await sequelize.transaction();

            let total_amount = 0;
            body.forEach(product => {
                total_amount += (product.amount * product.quantity)
            })

            let account = await Account.findOne({
                where: {
                    user_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!account) throw new BusinessErrors(0,'account')

            let max_allowed_balance = parseFloat(account.balance) - parseFloat(account.holded_amount) 
            //check maximum allowed balance
            if (total_amount > max_allowed_balance ) throw new BusinessErrors(1)

            const order = await Order.create({
                status: 'pending',
                user_id
            }, {
                transaction
            });

            body.forEach(async product => {
                await Order_Detail.create({
                    order_id: order.id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    amount: product.amount * product.quantity
                }, {
                    transaction
                });

            })
            
            let holded = parseFloat(account.holded_amount) 
            holded += total_amount
            account.holded_amount = holded

            await account.save({
                fields: ['holded_amount'],
                transaction
            });
            await transaction.commit();

            let d = moment(order.createdAt)
            return {
                    order_id: order.id,
                    order_amount: total_amount, 
                    order_date: d.format('DD-MM-YYYY'),
                    order_time: d.format('HH:mm:ss')
                }

        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            console.log(err);
            if (transaction) await transaction.rollback();
            throw err
        }

    }

}

module.exports = OrdersService