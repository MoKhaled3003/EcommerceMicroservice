const Order = require("../models/index")["Order"];
const Order_Detail = require("../models/index")["Order_Detail"];
const Holded_Amount = require("../models/index")["Holded_Amount"];
const Account = require("../models/index")["Account"];
const sequelize = require("../models/index").sequelize

let {
    paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment')

const errors = require('../errors/businessErrors')
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
        if (!orders) throw new BusinessErrors(await errors.NOTFOUND('orders'))

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

            if (!order) throw new BusinessErrors(await errors.NOTFOUND('order'))
            if (order.status == 'delivered') throw new BusinessErrors(errors.ORDER_DELIVERED)

            let account = await Account.findOne({
                where: {
                    user_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!account) throw new BusinessErrors(await errors.NOTFOUND('account'))


            let orderDetail = await Order_Detail.findAll({
                where: {
                    order_id
                },
                raw:true
            }, {
                transaction
            });
            
            let deletedOrderDetail = orderDetail.map(e=>e.id)

            await Order_Detail.destroy({ where: { id: deletedOrderDetail }})
            await Order.destroy({ where: { id: order_id }})
            await Holded_Amount.destroy({ where: { order_id }})

            await transaction.commit();
            return true

        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            console.log(err);
            if (transaction) await transaction.rollback();
            throw err
        }

    }

    static async makeOrder(body, user_id) {
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
            if (!account) throw new BusinessErrors(await errors.NOTFOUND('account'))

            let holded_amount = await Holded_Amount.findOne({
                where: {
                    user_id
                },
                attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
                raw:true,
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if(!holded_amount.total) holded_amount.total = 0
            let max_allowed_balance = parseFloat(account.balance) - parseFloat(holded_amount.total)

            console.log('max allowed balance',max_allowed_balance)
            //check maximum allowed balance
            if (total_amount > max_allowed_balance ) throw new BusinessErrors(errors.INSUFFCIENT_BALANCE)

            let order = await Order.create({
                status: 'pending',
                user_id
            }, {
                transaction
            });
            for(let product of body){
                await Order_Detail.create({
                    order_id: order.id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    amount: product.amount * product.quantity
                }, {
                    transaction
                });
            }

            await Holded_Amount.create({
                order_id: order.id,
                amount: total_amount,
                user_id:user_id
            }, {
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
            if(isNaN(err.code)) throw new BusinessErrors(errors.TRANSACTION_FAILED)
            throw err
        }

    }

    static async deliverOrder(order_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let order = await Order.findOne({
                where: {
                    id: order_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            })

            if (!order) throw new BusinessErrors(await errors.NOTFOUND('order'))
            if (order.status == 'delivered') throw new BusinessErrors(errors.ORDER_DELIVERED)

            order.status = 'delivered'
            await order.save({fields: ['status'],transaction});
            
            let holded_amount = await Holded_Amount.findOne({
                where: {
                    order_id
                },
                raw:true,
                transaction
            });
            if (!holded_amount) throw new BusinessErrors(await errors.NOTFOUND('holded_amount'))

            let account = await Account.findOne({
                where: {
                    user_id:order.user_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!account) throw new BusinessErrors(await errors.NOTFOUND('account'))

            let deductedAmount = parseFloat(account.balance) - parseFloat(holded_amount.amount)
            account.balance = deductedAmount;

            await account.save({fields: ['balance'],transaction});

            await Holded_Amount.destroy({ where: {order_id }})
            await transaction.commit();
            return true

        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            console.log(err);
            if (transaction) await transaction.rollback();
            if(isNaN(err.code)) throw new BusinessErrors(errors.TRANSACTION_FAILED)
            throw err
        }

    }


}

module.exports = OrdersService