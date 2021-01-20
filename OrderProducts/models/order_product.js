
'use strict';
module.exports = (sequelize, DataTypes) => {
    let Order_Product = sequelize.define('Order_Product', {
        price:DataTypes.DECIMAL(10,2),
        quantity:DataTypes.INTEGER
  }, {
    });
    Order_Product.associate = function(models) {
      Order_Product.belongsTo(models.Product, { foreignKey: 'product_id' });
      Order_Product.belongsTo(models.Order, { foreignKey: 'order_id' });
      };
  return Order_Product;
};