//models
const Order = require("../models/index")["Order"];
const Order_Product = require("../models/index")["Order_Detail"];
const Account = require("../models/index")["Account"];
const sequelize = require("../models/index").sequelize
let {
    paginate
} = require('../middleware/paginate')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
        if (!orders) return {
            code: 404,
            message: "there is no orders"
        }

        return {
            code: 200,
            message: orders
        }

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

            if (!order) return {
                code: 400,
                message: 'order is not found'
            }

            if (order.status == 'delivered') return {
                code: 400,
                message: 'order is delivered'
            }

            let account = await Account.findOne({
                where: {
                    user_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!account) return {
                code: 400,
                message: 'Account is not found'
            }


            let orderDetail = await Order_Detail.findAll({
                where: {
                    order_id
                },
                attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
            }, {
                transaction
            });
            


            account.holded_amount -= orderDetail.total

            

            await account.save({
                fields: ['holded_amount'],
                transaction
            });
            await transaction.commit();

            let d = moment(order.createdAt)
            return {
                code: 200,
                message: {
                    order_id: order.id,
                    order_amount: total_amount,
                    order_date: d.format('DD-MM-YYYY'),
                    order_time: d.format('HH:mm:ss')
                }
            }

        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            console.log(err);
            if (transaction) await transaction.rollback();
            return {
                code: 500,
                message: "Order is not completed"
            }
        }

    }

    static async makeOrder(body, user_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();

            let total_amount = 0;
            body.foreach(product => {
                total_amount += (product.amount * product.quantity)
            })

            let account = await Account.findOne({
                where: {
                    user_id
                },
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            if (!account) return {
                code: 400,
                message: 'Account is not found'
            }

            //check maximum allowed balance
            if (total_amount > account.balance - account.holded_amount) return {
                code: 400,
                message: 'Balance is not sufficient'
            }

            const order = await Order.create({
                status: 'pending'
            }, {
                transaction
            });

            body.foreach(product => {
                let orderDetail = await Order_Detail.create({
                    order_id: order.id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    amount: product.amount * product.quantity
                }, {
                    transaction
                });

            })

            account.holded_amount += total_amount

            await account.save({
                fields: ['holded_amount'],
                transaction
            });
            await transaction.commit();

            let d = moment(order.createdAt)
            return {
                code: 200,
                message: {
                    order_id: order.id,
                    order_amount: total_amount,
                    order_date: d.format('DD-MM-YYYY'),
                    order_time: d.format('HH:mm:ss')
                }
            }

        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            console.log(err);
            if (transaction) await transaction.rollback();
            return {
                code: 500,
                message: "Order is not completed"
            }
        }

    }

}

module.exports = OrdersService