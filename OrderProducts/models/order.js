
'use strict';
module.exports = (sequelize, DataTypes) => {
    let Order = sequelize.define('Order', {
        price:DataTypes.DOUBLE,
        status:DataTypes.ENUM('pending','canceled','shipped','done')
  }, {
    });
    Order.associate = function(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      };
  return Order;
};