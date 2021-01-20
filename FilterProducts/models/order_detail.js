
'use strict';
module.exports = (sequelize, DataTypes) => {
    let Order_Detail = sequelize.define('Order_Detail', {
        amount:DataTypes.DECIMAL(10,2),
        quantity:DataTypes.INTEGER
  }, {
    });
    Order_Detail.associate = function(models) {
      Order_Detail.belongsTo(models.Product, { foreignKey: 'product_id' });
      Order_Detail.belongsTo(models.Order, { foreignKey: 'order_id' });
      };
  return Order_Detail;
};